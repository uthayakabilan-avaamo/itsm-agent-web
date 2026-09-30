import Navbar from "@/components/Navbar";

export default function WidgetDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center">
        <p className="text-lg text-muted">
          The chat widget demo banner appears in the bottom corner.
        </p>
      </main>
    </div>
  );
}
