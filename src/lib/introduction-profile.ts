import type { PostContent, PostExtended } from "@/types/post";

function normalizePath(path?: string) {
  return (path || "").split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
}

export function isIntroductionPath(path?: string) {
  const normalized = normalizePath(path);
  return normalized === "about" || normalized.startsWith("about/");
}

export function isMemberProfilePath(path?: string) {
  const normalized = normalizePath(path);
  return ["about/board-of-directors", "about/expert-council"].some(
    (parent) => normalized === parent || normalized.startsWith(`${parent}/`),
  );
}

export const profileTabs = [
  { value: "introduction", label: "Giới thiệu chung" },
  { value: "experience", label: "Kinh nghiệm" },
  { value: "achievements", label: "Thành tích" },
] as const;

export type ProfileTab = (typeof profileTabs)[number]["value"];
export type ProfileSections = Record<ProfileTab, PostContent[]>;

function tabForHeading(html: string): ProfileTab | undefined {
  const label = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("vi");
  return profileTabs.find((tab) => tab.label.toLocaleLowerCase("vi") === label)?.value;
}

// The existing admin saves rich text sections. Named headings select a tab;
// unlabelled content stays in the current tab (initially the introduction).
// Preserve section order, unrecognised headings, and attached images.
export function getProfileSections(post: Pick<PostExtended, "post_content">): ProfileSections {
  const result: ProfileSections = { introduction: [], experience: [], achievements: [] };
  let active: ProfileTab = "introduction";
  const sections = [...(post.post_content || [])].sort(
    (a, b) => (a.position || 0) - (b.position || 0),
  );

  sections.forEach((section, sectionIndex) => {
    const html = section.content || "";
    const headings = /<(h[1-6]|p)\b[^>]*>[\s\S]*?<\/\1>/gi;
    let start = 0;
    let part = 0;
    const addContent = (content: string) => {
      if (!content.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/gi, " " ).trim() && !/<(?:img|video|iframe|hr)\b/i.test(content)) return;
      result[active].push({
        ...section,
        id: `${section.id || sectionIndex}-text-${part++}`,
        content,
        post_content_images: [],
      });
    };

    for (const match of html.matchAll(headings)) {
      const tab = tabForHeading(match[0]);
      if (!tab) continue;
      addContent(html.slice(start, match.index));
      active = tab;
      start = match.index! + match[0].length;
    }
    addContent(html.slice(start));
    if (section.post_content_images?.length) {
      result[active].push({
        ...section,
        id: `${section.id || sectionIndex}-images`,
        content: "",
      });
    }
  });
  return result;
}
