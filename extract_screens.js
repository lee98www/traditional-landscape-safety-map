const fs = require('fs');

// Read the Figma JSON file
const figmaData = JSON.parse(fs.readFileSync('figma_design.json', 'utf8'));

// Screen IDs to extract
const screenIds = [
  '74:6031',   // 점검 대상지 선택
  '24:27',     // 대상지 상세 정보
  '51:12166',  // 기본 정보
  '43:23233',  // 재해 이력
  '51:12300',  // 재해 이력 상세
  '51:12741',  // 수리 이력
  '141:6702',  // 수리 이력 상세
  '84:7285',   // 점검 대상 선택
  '170:9393',  // 점검 대상 선택 리스트
  '170:40975', // 일반현황
  '292:11665', // 점검항목
  '94:8479',   // 점검항목 상세
  '94:49249',  // 종합판정
  '94:47918',  // 확인하기
  '170:9595',  // 확인하기 상세
  '141:6385',  // 대상지 선택 텍스트 입력
  '292:11074', // 점검 대상지 선택 지도 팝업
  '292:11480', // 점검 대상지 선택 지도 팝업 상세
  '51:13323',  // 재해 이력 타임라인
  '170:40200', // 확인하기 최종
];

// Recursive function to find node by ID
function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Extract text from node
function extractText(node, depth = 0) {
  const result = [];

  if (node.type === 'TEXT' && node.characters) {
    result.push({
      type: 'text',
      content: node.characters,
      style: {
        fontSize: node.style?.fontSize,
        fontWeight: node.style?.fontWeight,
        fontFamily: node.style?.fontFamily,
        textAlign: node.style?.textAlignHorizontal,
        color: node.fills?.[0]?.color
      }
    });
  }

  if (node.children) {
    for (const child of node.children) {
      result.push(...extractText(child, depth + 1));
    }
  }

  return result;
}

// Extract all components from node
function extractComponents(node) {
  const result = {
    name: node.name,
    type: node.type,
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    background: node.fills?.[0]?.color || node.backgroundColor,
    texts: [],
    buttons: [],
    inputs: [],
    children: []
  };

  // Extract text content
  if (node.type === 'TEXT') {
    result.texts.push({
      content: node.characters,
      fontSize: node.style?.fontSize,
      fontWeight: node.style?.fontWeight,
      color: node.fills?.[0]?.color
    });
  }

  // Detect buttons (rectangles with text children)
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    const hasText = node.children?.some(c => c.type === 'TEXT');
    if (hasText && node.name.includes('button') || node.name.includes('Button') || node.name.includes('버튼')) {
      const texts = extractText(node);
      result.buttons.push({
        text: texts[0]?.content,
        background: node.fills?.[0]?.color,
        borderRadius: node.cornerRadius
      });
    }
  }

  // Detect inputs
  if (node.name.includes('input') || node.name.includes('Input') || node.name.includes('입력')) {
    const texts = extractText(node);
    result.inputs.push({
      placeholder: texts[0]?.content,
      label: node.name
    });
  }

  // Recursively extract children
  if (node.children) {
    for (const child of node.children) {
      result.children.push(extractComponents(child));
    }
  }

  return result;
}

// Process each screen
const screens = {};
const document = figmaData.document;

for (const screenId of screenIds) {
  console.log(`Extracting screen ${screenId}...`);
  const node = findNodeById(document, screenId);

  if (node) {
    screens[screenId] = {
      id: screenId,
      name: node.name,
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      background: node.backgroundColor,
      components: extractComponents(node),
      allTexts: extractText(node)
    };
    console.log(`  Found: ${node.name}`);
    console.log(`  Texts: ${screens[screenId].allTexts.length}`);
  } else {
    console.log(`  NOT FOUND: ${screenId}`);
  }
}

// Save extracted data
fs.writeFileSync('extracted_screens.json', JSON.stringify(screens, null, 2));
console.log('\nExtracted screens saved to extracted_screens.json');
console.log(`Total screens extracted: ${Object.keys(screens).length}`);
