export interface PageHeaderProps {
  title: string;
  description?: string;
}

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

export interface TeacherItemProps {
  teacher: Teacher;
}

export interface Classes {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
}
