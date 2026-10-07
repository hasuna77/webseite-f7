// Re-exportiert die echten Geschäftsdaten der Website, damit alle Agents
// exakt dieselben Informationen verwenden wie die Seite selbst.
export { business, services, seoKeywords } from "../../src/lib/content/business";
export { posts } from "../../src/lib/content/posts";
export type { Post, PostSection } from "../../src/lib/content/posts";
