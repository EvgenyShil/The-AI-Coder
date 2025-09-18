export default function Diagram() {
  return (
    <div
      data-testid="diagram-root"
      className="min-h-screen w-full p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white text-gray-900"
    >
      <div className="max-w-[960px] mx-auto space-y-6">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold leading-tight">ИИ-программист</h1>
            <p className="text-gray-600">
              Диаграмма с участием модуля VS Code, агента и локальной модели GigaCode/Cotype удалена.
            </p>
          </div>
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-gray-500 text-sm leading-relaxed">
            Новый сценарий будет добавлен позже.
          </div>
        </div>
      </div>
    </div>
  );
}
