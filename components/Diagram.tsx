import { useState } from "react";
import { Cpu, Bot, Code, GitBranch, ArrowRight, MessageSquare, FileCode2 } from "lucide-react";

// --- UI building blocks -----------------------------------------------------
function Node({ title, subtitle, icon: Icon, accent = "", children, showDescriptions = true }: any) {
  const [open, setOpen] = useState(true);
  const canShow = showDescriptions && open;
  return (
    <div data-testid="node" className={'relative rounded-2xl shadow-lg border bg-white ' + accent + ' p-4'} style={{ width: 340 }}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl border bg-gray-50">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-500 truncate">{subtitle}</div>
          <div className="text-lg font-semibold leading-snug">{title}</div>
        </div>
        {showDescriptions ? (
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="text-xs underline text-gray-700 hover:text-gray-900"
            aria-expanded={open}
            aria-controls={title + '-desc'}
          >
            {open ? "Свернуть" : "Развернуть"}
          </button>
        ) : null}
      </div>
      {canShow ? (
        <div id={title + '-desc'} className="mt-3 text-sm text-gray-700">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function SplitNode({ title, subtitle, left, right, showDescriptions = true }: any) {
  const [open, setOpen] = useState(true);
  const canShow = showDescriptions && open;
  return (
    <div className={'relative rounded-2xl shadow-lg border bg-white p-4'} style={{ width: 520 }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-gray-500">{subtitle}</div>
          <div className="text-lg font-semibold leading-snug">{title}</div>
        </div>
        {showDescriptions ? (
          <button type="button" onClick={() => setOpen(v => !v)} className="text-xs underline text-gray-700 hover:text-gray-900" aria-expanded={open}>
            {open ? "Свернуть" : "Развернуть"}
          </button>
        ) : null}
      </div>
      {canShow ? (
        <div className="mt-3 grid grid-cols-2 gap-4">
          {/* Left half */}
          <div className="rounded-xl border p-3">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4" />
              <div className="text-sm font-medium">Генерация кода</div>
            </div>
            {left}
          </div>
          {/* Right half */}
          <div className="rounded-xl border p-3">
            <div className="flex items-center gap-2 mb-2">
              <FileCode2 className="w-4 h-4" />
              <div className="text-sm font-medium">Генерация манифеста</div>
            </div>
            {right}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2" aria-label={label ? `arrow:${label}` : "arrow"}>
      {label ? <div className="text-xs text-gray-600 whitespace-nowrap">{label}</div> : null}
      <ArrowRight className="w-6 h-6" />
    </div>
  );
}

function Lane({ title, children }: any) {
  return (
    <div data-testid="lane" className="rounded-3xl border p-4 bg-gray-50/60">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{title}</div>
      <div className="flex flex-wrap gap-4 items-center">{children}</div>
    </div>
  );
}

// --- Single variant (Вариант 2) -------------------------------------------
export default function Diagram() {
  const [showDescriptions, setShowDescriptions] = useState(true);

  return (
    <div data-testid="diagram-root" className="min-h-screen w-full p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight">ИИ‑программист</h1>
            
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input data-testid="toggle-descriptions" type="checkbox" checked={showDescriptions} onChange={() => setShowDescriptions(v => !v)} /> Описание
          </label>
        </div>

        <Lane title="">
          <Node title="VS Code: модуль GigaCode — open source и др." subtitle="" icon={Code} showDescriptions={showDescriptions}>
            <ul className="list-disc ml-4 mt-2">
              <li>Промпт вводится прямо в модуле (IDE).</li>
              <li>Модуль формирует запрос для агента.</li>
              <li>Интеграции: open source и др.</li>
            </ul>
          </Node>
          <Arrow label="prompt →" />
          <Node title="Агент GigaCode — open source и др." subtitle="" icon={Cpu} showDescriptions={showDescriptions}>
            <ul className="list-disc ml-4 mt-2">
              <li>Передача запроса к модели, управление контекстом.</li>
              <li>Безопасность и логгирование вызовов.</li>
              <li>Интеграции: open source и др.</li>
            </ul>
          </Node>
          <Arrow label="request" />
          <Node title="Локальная модель: GigaCode, Cotype — open source и др." subtitle="" icon={Bot} showDescriptions={showDescriptions}>
            <ul className="list-disc ml-4 mt-2">
              <li>Одновременная генерация: код + манифест.</li>
              <li>Возврат результата агенту.</li>
              <li>Опции моделей: GigaCode, Cotype; open source и др.</li>
            </ul>
          </Node>
          <Arrow label="response" />
          <SplitNode
            title="Генерация артефактов"
            subtitle="Код + Манифест"
            showDescriptions={showDescriptions}
            left={
              <ul className="list-disc ml-4 mt-2">
                <li>Файлы сервиса, модули, конфиг.</li>
                <li>По необходимости: тесты/скрипты.</li>
              </ul>
            }
            right={
              <ul className="list-disc ml-4 mt-2">
                <li>Deployment/Service/Ingress манифесты.</li>
                <li>Подстановка образа, переменных, портов.</li>
              </ul>
            }
          />
          <Arrow label="ответ в модуль" />
          <Node title="VS Code: модуль" subtitle="Получение ответа" icon={Code} showDescriptions={showDescriptions}>
            <ul className="list-disc ml-4 mt-2">
              <li>Вставка артефактов (код + манифест) в проект.</li>
              <li>Правки и подготовка commit.</li>
            </ul>
          </Node>
          <Arrow label="commit/push" />
          <Node title="VCS: GitFlic (локальный) — open source и др." subtitle="" icon={GitBranch} showDescriptions={showDescriptions}>
            <ul className="list-disc ml-4 mt-2">
              <li>Commit & Push из IDE.</li>
              <li>MR и ревью изменений.</li>
              <li>Интеграции: open source и др.</li>
            </ul>
          </Node>
        </Lane>
      </div>
    </div>
  );
}
