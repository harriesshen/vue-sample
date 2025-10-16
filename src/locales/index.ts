// src/locales/index.ts (更安全的版本)

// 為 messages 物件提供一個更明確的類型
const messages: Record<string, Record<string, unknown>> = {}

// 使用 Eager 模式，直接取得所有模組內容
const modules = import.meta.glob('./*/*.json', { eager: true })
try {
  for (const path in modules) {
    // 取得該路徑對應的模組內容
    if (!path) throw new Error('translate path is empty')
    const moduleContent = modules[path]

    // --- 安全性檢查 #1 ---
    // 如果模組內容不存在，則跳過此次迴圈
    if (!moduleContent) {
      throw new Error(`Could not load module at path: ${path}`)
    }

    const pathParts = path.split('/') // 例如：['.', 'en', 'common.json']
    console.log('pathParts:', pathParts)
    if (pathParts.length < 3) {
      throw new Error(`Invalid path structure: ${path}`)
    }
    const lang = pathParts[1]
    const moduleName = pathParts[2]?.replace('.json', '')
    // --- 安全性檢查 #2 ---
    // 確保路徑結構至少有三層 (./locale/file.json)
    if (pathParts.length < 3) {
      console.warn(`Invalid path structure: ${path}`)
      continue
    }

    // --- 安全性檢查 #3 ---
    // 確保成功解析出 lang 和 moduleName
    if (!lang || !moduleName) {
      console.warn(`Could not determine lang or moduleName from path: ${path}`)
      continue
    }

    // 如果該語言的物件還不存在，則初始化為一個空物件
    if (!messages[lang]) {
      messages[lang] = {}
    }

    // 優先使用 .default，如果沒有則直接使用整個模組
    // 使用 'as any' 是因為我們知道 JSON 模組的結構可能不同
    messages[lang][moduleName] =
      (moduleContent as Record<string, unknown>).default || moduleContent
  }
} catch (error) {
  console.error('translate compile error', error)
}
export default messages
