import { useCallback, useEffect, useState } from "react";

export type Reaction = "tim" | "hoang" | "ma" | "nghi";
export const reactionList: { key: Reaction; emoji: string; label: string }[] = [
  { key: "tim", emoji: "❤️", label: "Thả tim" },
  { key: "hoang", emoji: "😳", label: "Hoảng nhẹ" },
  { key: "ma", emoji: "👻", label: "Rợn rợn" },
  { key: "nghi", emoji: "🤔", label: "Nghi nghi" },
];

export type Comment = { id: string; author: string; date: string; text: string; likes: number; replies: Comment[] };
export type CommunityPost = {
  id: string;
  author: string;
  date: string;
  title: string;
  body: string[];
  topic: string;
  location?: string | undefined;
  relatedSlug?: string | undefined;
  image?: string | undefined;
  reactions: Record<Reaction, number>;
  comments: Comment[];
  pending?: boolean;
};

export const seedPosts: CommunityPost[] = [
  {
    id: "tieng-go-cua-ky-tuc-xa",
    author: "Mèo Ngủ Muộn",
    date: "2026-09-28",
    title: "Tiếng gõ cửa ở ký túc xá lúc 1 giờ",
    body: [
      "Hồi năm nhất, phòng mình ở cuối dãy. Đêm nào tầm 1 giờ cũng có ba tiếng gõ cửa rất nhẹ, mở ra thì không có ai.",
      "Sau một tuần cả phòng quyết định canh. Hóa ra là… cành cây ngoài cửa sổ hành lang đập vào khung sắt mỗi khi gió lùa. Nhưng công nhận tuần đó tụi mình ngủ chung một giường cho chắc.",
    ],
    topic: "Trường học",
    location: "Việt Nam",
    relatedSlug: "teke-teke-san-truong",
    reactions: { tim: 42, hoang: 13, ma: 8, nghi: 21 },
    comments: [
      { id: "c1", author: "Bánh Bao", date: "2026-09-28", text: "Ủa trường mình cũng có lời đồn y chang luôn á!", likes: 6, replies: [
        { id: "c1r1", author: "Mèo Ngủ Muộn", date: "2026-09-29", text: "Chắc cây nào cũng thích gõ cửa ban đêm 😂", likes: 3, replies: [] },
      ] },
      { id: "c2", author: "Ma Nhỏ Lạc Đường", date: "2026-09-29", text: "Ngủ chung một giường là phản ứng hợp lý nhất mình từng nghe.", likes: 11, replies: [] },
    ],
  },
  {
    id: "ba-cu-ban-che-dem-mua",
    author: "Hạt Tiêu",
    date: "2026-09-25",
    title: "Bà cụ bán chè trong đêm mưa",
    body: [
      "Ngoại mình kể ở đầu hẻm ngày xưa có bà cụ chỉ bán chè vào đêm mưa. Ai ăn xong cũng thấy ấm bụng lạ thường, nhưng sáng ra hỏi thì không ai biết bà ở đâu.",
      "Ngoại bảo chắc bà là người tốt đi lạc qua xóm. Mình thì nghĩ chắc ngoại muốn dụ mình ăn chè đậu đỏ thôi.",
    ],
    topic: "Đường phố",
    location: "Huế, Việt Nam",
    reactions: { tim: 67, hoang: 2, ma: 5, nghi: 9 },
    comments: [],
  },
  {
    id: "bup-be-tu-xoay-dau",
    author: "Cún Hay Giật Mình",
    date: "2026-09-20",
    title: "Con búp bê trên kệ tự xoay đầu",
    body: [
      "Nhà mình có con búp bê sứ cũ. Mỗi sáng nó lại quay mặt về phía cửa sổ dù tối hôm trước mình đã xoay vào tường.",
      "Mẹ mình thú nhận là… mẹ thấy nó quay vào tường tội quá nên xoay lại. Bí ẩn được giải, nhưng mình vẫn cất nó vào hộp.",
    ],
    topic: "Đồ vật",
    location: "Nhật Bản",
    relatedSlug: "cuoc-goi-luc-ba-gio",
    reactions: { tim: 35, hoang: 19, ma: 14, nghi: 6 },
    comments: [
      { id: "c3", author: "Lá Me", date: "2026-09-21", text: "Mẹ bạn là nhân vật chính của câu chuyện này 😆", likes: 9, replies: [] },
    ],
  },
];

const KEY = "ttdt-community-v1";
type Store = { posts: CommunityPost[] };

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch {
    /* ignore */
  }
  return { posts: seedPosts };
}

export function useCommunity() {
  const [store, setStore] = useState<Store>({ posts: seedPosts });
  useEffect(() => setStore(load()), []);
  const update = useCallback((fn: (posts: CommunityPost[]) => CommunityPost[]) => {
    setStore((prev) => {
      const next = { posts: fn(prev.posts) };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const addPost = (post: Omit<CommunityPost, "id" | "date" | "reactions" | "comments">) => {
    const id = `chuyen-${Date.now()}`;
    update((posts) => [{ ...post, id, date: new Date().toISOString().slice(0, 10), reactions: { tim: 0, hoang: 0, ma: 0, nghi: 0 }, comments: [] }, ...posts]);
    return id;
  };
  const react = (postId: string, key: Reaction) =>
    update((posts) => posts.map((p) => (p.id === postId ? { ...p, reactions: { ...p.reactions, [key]: p.reactions[key] + 1 } } : p)));
  const addComment = (postId: string, author: string, text: string, parentId?: string) => {
    const c: Comment = { id: `c-${Date.now()}`, author: author || "Người qua đường", date: new Date().toISOString().slice(0, 10), text, likes: 0, replies: [] };
    const insert = (list: Comment[]): Comment[] => list.map((x) => (x.id === parentId ? { ...x, replies: [...x.replies, c] } : { ...x, replies: insert(x.replies) }));
    update((posts) => posts.map((p) => (p.id === postId ? { ...p, comments: parentId ? insert(p.comments) : [...p.comments, c] } : p)));
  };
  const likeComment = (postId: string, commentId: string) => {
    const bump = (list: Comment[]): Comment[] => list.map((x) => (x.id === commentId ? { ...x, likes: x.likes + 1 } : { ...x, replies: bump(x.replies) }));
    update((posts) => posts.map((p) => (p.id === postId ? { ...p, comments: bump(p.comments) } : p)));
  };
  return { posts: store.posts, addPost, react, addComment, likeComment };
}

export const countComments = (list: Comment[]): number => list.reduce((n, c) => n + 1 + countComments(c.replies), 0);
export const totalReactions = (p: CommunityPost) => Object.values(p.reactions).reduce((a, b) => a + b, 0);
export const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
