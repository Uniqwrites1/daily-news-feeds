import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parser = new Parser({
  headers: {
    'User-Agent': 'Nigeria Daily Security Brief (https://github.com)'
  }
});

// Keywords for filtering (security + traffic)
const SECURITY_KEYWORDS = [
  'banditry', 'bandit', 'kidnapping', 'kidnapped', 'abducted',
  'attack', 'attacked', 'gunmen', 'gunfire', 'shooting', 'shot',
  'police', 'arrest', 'arrested', 'military', 'army', 'soldier',
  'insurgency', 'insurgent', 'terrorism', 'terrorist', 'boko haram',
  'iswap', 'defence', 'security operation', 'operation', 'ambush',
  'explosion', 'bomb', 'bombing', 'hostage', 'captive', 'raid',
  'security', 'officer', 'killed', 'death', 'dead', 'casualty',
  'threat', 'conflict', 'violence', 'assault', 'massacre',
  'niger delta', 'piracy', 'kidnap', 'ransom'
];

// Traffic-related keywords to include in the report
const TRAFFIC_KEYWORDS = [
  'traffic', 'accident', 'road', 'crash', 'pileup', 'gridlock',
  'congestion', 'vehicle', 'motor accident', 'roadblock', 'roads closed',
  'collision', 'fatal crash', 'traffic jam', 'traffic update', 'flooding'
];

// Threat categories and their keywords
const THREAT_CATEGORIES = {
  'Banditry': ['banditry', 'bandit', 'armed robbery', 'rustling'],
  'Kidnapping': ['kidnapping', 'kidnapped', 'abducted', 'captive', 'ransom'],
  'Insurgency': ['insurgency', 'insurgent', 'boko haram', 'iswap', 'terrorism'],
  'Military/Security Operations': ['military operation', 'security operation', 'operation', 'army raid'],
  'Armed Conflict': ['attack', 'gunfire', 'shooting', 'ambush', 'conflict', 'violence'],
  'Law Enforcement': ['police', 'arrest', 'arrested', 'security officer'],
  'Traffic': ['traffic', 'accident', 'crash', 'road', 'pileup', 'congestion', 'gridlock']
};

// Google News RSS feeds for Nigeria
const RSS_FEEDS = [
  'https://news.google.com/rss/search?q=Nigeria+security&hl=en-NG&gl=NG&ceid=NG:en',
  'https://news.google.com/rss/search?q=Nigeria+security+news&hl=en-NG&gl=NG&ceid=NG:en',
  'https://news.google.com/rss/headlines?q=Nigeria&hl=en-NG&gl=NG&ceid=NG:en'
];

// Nigerian news outlets for direct RSS (fallback)
const NIGERIAN_OUTLETS = [
  'https://www.pulse.ng/feed', // Pulse Nigeria
  'https://www.vanguardngr.com/feed/', // Vanguard
  'https://www.thecable.ng/feed', // The Cable
];

function isRelevant(text) {
  const lowerText = (text || '').toLowerCase();
  return SECURITY_KEYWORDS.some(keyword => lowerText.includes(keyword)) ||
    TRAFFIC_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function categorizeHeadline(title) {
  const lowerTitle = title.toLowerCase();
  
  for (const [category, keywords] of Object.entries(THREAT_CATEGORIES)) {
    if (keywords.some(keyword => lowerTitle.includes(keyword))) {
      return category;
    }
  }
  
  return 'Security News'; // Default category
}

function normalizeTitle(title) {
  // Remove common prefixes and normalize
  if (!title) return '';
  // Strip leading junk
  let t = title.replace(/^[\d\s\-\:\.]+/, '').trim();
  // If title ends with " - SourceName" (common in Google News), strip that
  const parts = t.split(' - ');
  if (parts.length > 1) {
    const last = parts[parts.length - 1].trim();
    if (last.length > 0 && last.length < 40 && /[A-Za-z]/.test(last)) {
      parts.pop();
      t = parts.join(' - ').trim();
    }
  }
  return t;
}

function extractSource(item) {
  // Prefer explicit source fields
  if (item.source && item.source.title) return item.source.title;
  if (item.creator) return item.creator;
  if (item['dc:creator']) return item['dc:creator'];

  // Try to parse from title if it ends with ' - Source Name'
  const title = item.title || '';
  const parts = title.split(' - ');
  if (parts.length > 1) {
    const candidate = parts[parts.length - 1].trim();
    if (candidate.length > 0 && candidate.length < 40 && /[A-Za-z]/.test(candidate)) {
      return candidate;
    }
  }

  // Fallback: attempt to extract domain from link
  try {
    const u = new URL(item.link);
    return u.hostname.replace('www.', '');
  } catch (e) {
    return 'Unknown Source';
  }
}

function getSimilarityScore(str1, str2) {
  const s1 = normalizeTitle(str1).toLowerCase();
  const s2 = normalizeTitle(str2).toLowerCase();
  
  if (s1 === s2) return 1;
  
  // Simple substring match for near-duplicates
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.95;
  }
  
  return 0;
}

function removeDuplicates(headlines) {
  const unique = [];
  
  for (const headline of headlines) {
    const isDuplicate = unique.some(existing => 
      getSimilarityScore(headline.title, existing.title) > 0.8
    );
    
    if (!isDuplicate) {
      unique.push(headline);
    }
  }
  
  return unique;
}

async function fetchAndParse(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items || [];
  } catch (error) {
    console.error(`Error fetching ${feedUrl}:`, error.message);
    return [];
  }
}

async function fetchAllFeeds() {
  console.log('Fetching RSS feeds...');
  let allItems = [];
  
  // Fetch from Google News feeds
  for (const feedUrl of RSS_FEEDS) {
    const items = await fetchAndParse(feedUrl);
    allItems = allItems.concat(items);
  }
  
  // Optionally try Nigerian outlets (with error handling)
  for (const feedUrl of NIGERIAN_OUTLETS) {
    const items = await fetchAndParse(feedUrl);
    allItems = allItems.concat(items);
  }
  
  return allItems;
}

async function generateReport() {
  try {
    // Fetch all items
    const allItems = await fetchAllFeeds();
    console.log(`Fetched ${allItems.length} total items`);
    
    // Filter for relevant content (security + traffic)
    const securityHeadlines = allItems
      .filter(item => isRelevant(item.title || ''))
      .map(item => {
        const rawTitle = item.title || '';
        return {
          title: normalizeTitle(rawTitle),
          link: item.link,
          source: extractSource(item) || 'Unknown Source',
          pubDate: item.pubDate || item.isoDate,
          category: categorizeHeadline(rawTitle)
        };
      });
    
    // Remove duplicates
    const uniqueHeadlines = removeDuplicates(securityHeadlines);
    
    console.log(`Filtered to ${uniqueHeadlines.length} security-related headlines`);
    
    // Count by category
    const categoryCounts = {};
    uniqueHeadlines.forEach(h => {
      categoryCounts[h.category] = (categoryCounts[h.category] || 0) + 1;
    });
    
    // Find dominant threat type
    const dominantThreat = Object.entries(categoryCounts).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0] || 'General Security News';
    
    // Create report
    const report = {
      timestamp: new Date().toISOString(),
      generatedAt: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
      totalHeadlines: uniqueHeadlines.length,
      dominantThreat: dominantThreat,
      categoryCounts: categoryCounts,
      headlines: uniqueHeadlines
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 50) // Limit to top 50 to keep file size reasonable
    };
    
    // Write to data.json
    const outputPath = path.join(__dirname, 'data.json');
    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    
    console.log(`✓ Report generated: ${outputPath}`);
    console.log(`✓ Total security headlines: ${report.totalHeadlines}`);
    console.log(`✓ Dominant threat type: ${report.dominantThreat}`);
    
  } catch (error) {
    console.error('Error generating report:', error);
    process.exit(1);
  }
}

// Run the script
generateReport();
