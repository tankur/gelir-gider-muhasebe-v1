interface PrintSectionProps {
  title: string;
  children: React.ReactNode;
}

export function PrintSection({ title, children }: PrintSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-600">
        {title}
      </h2>
      {children}
    </div>
  );
}