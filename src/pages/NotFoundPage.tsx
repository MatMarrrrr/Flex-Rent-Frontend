import ErrorLayout from "@/components/ui/ErrorLayout";

export default function NotFoundPage() {
  return <ErrorLayout code={404} message="Strona nie została znaleziona" />;
}
