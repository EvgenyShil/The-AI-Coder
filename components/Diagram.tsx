import { useState } from "react";
import { Cpu, Bot, Code, GitBranch, ArrowRight, MessageSquare, FileCode2, Layers } from "lucide-react";

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

// --- Variant 1 --------------------------------------------------------------
function Variant1({ showDescriptions }: { showDescriptions: boolean }) {
  return (
    <>
      <Lane title="Разработка (Вариант 1)">
        <Node title="Ввод промпта" subtitle="Задача/контекст" icon={MessageSquare} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li><strong>Задача</strong>: формулируем что нужно сделать и критерии готовности.</li>
            <li><strong>Уточнение</strong>: детали, ограничения, параметры (язык, фреймворк, порт).</li>
            <li><strong>Предустановка</strong>: промпт «нужно написать манифест» с шаблоном.</li>
            <li><strong>Контекст</strong>: ссылки на репозиторий, API, примеры.</li>
          </ul>
        </Node>
        <Arrow label="prompt" />
        <Node title="GigaCode" subtitle="Локальная модель" icon={Bot} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Одновременная генерация артефактов: код + манифест.</li>
            <li>Ассистирование: подсказки, дополнения.</li>
          </ul>
        </Node>
        <Arrow label="artifacts" />
        <SplitNode
          title="Генерация артефактов"
          subtitle="Код + Манифест"
          showDescriptions={showDescriptions}
          left={
            <ul className="list-disc ml-4 mt-2">
              <li>Исходники приложения, конфигурация.</li>
              <li>При необходимости — тестовые заготовки.</li>
            </ul>
          }
          right={
            <ul className="list-disc ml-4 mt-2">
              <li>Deployment/Service/Ingress шаблоны.</li>
              <li>Параметры: образ, теги, env, порты, реплики.</li>
            </ul>
          }
        />
        <Arrow label="интеграция" />
        <Node title="Модуль и агент GigaCode" subtitle="Интеграция" icon={Cpu} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Связь с IDE (VS Code).</li>
            <li>Работа с репозиторием: commit → push → MR в GitFlic.</li>
          </ul>
        </Node>
        <Arrow label="редактирование/commit" />
        <Node title="VS Code" subtitle="IDE" icon={Code} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Правки артефактов (код + манифест).</li>
            <li>Commit & Push.</li>
          </ul>
        </Node>
        <Arrow label="push" />
        <Node title="GitFlic (локальный)" subtitle="VCS" icon={GitBranch} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Хранение кода и манифестов.</li>
            <li>Merge Request и ревью.</li>
          </ul>
        </Node>
      </Lane>
    </>
  );
}

// --- Variant 2 --------------------------------------------------------------
function Variant2({ showDescriptions }: { showDescriptions: boolean }) {
  return (
    <>
      <Lane title="Разработка (Вариант 2)">
        <Node title="VS Code: модуль" subtitle="Ввод промпта" icon={Code} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Промпт вводится прямо в модуле (IDE).</li>
            <li>Модуль формирует запрос для агента.</li>
          </ul>
        </Node>
        <Arrow label="prompt →" />
        <Node title="Агент GigaCode" subtitle="Прокси/маршрутизация" icon={Cpu} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Передача запроса к модели, управление контекстом.</li>
            <li>Безопасность и логгирование вызовов.</li>
          </ul>
        </Node>
        <Arrow label="request" />
        <Node title="GigaCode" subtitle="Локальная модель" icon={Bot} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Одновременная генерация: код + манифест.</li>
            <li>Возврат результата агенту.</li>
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
        <Node title="GitFlic (локальный)" subtitle="VCS" icon={GitBranch} showDescriptions={showDescriptions}>
          <ul className="list-disc ml-4 mt-2">
            <li>Commit & Push из IDE.</li>
            <li>MR и ревью изменений.</li>
          </ul>
        </Node>
      </Lane>
    </>
  );
}

// --- Main diagram with variant switch --------------------------------------
export default function Diagram() {
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [variant, setVariant] = useState<'v1' | 'v2'>('v1');

  return (
    <div data-testid="diagram-root" className="min-h-screen w-full p-6 md:p-10 bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight">ИИ-программист: разработка</h1>
            <p className="text-gray-600">Выберите вариант: прямой промпт → модель (В1) или промпт через модуль/агент (В2).</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-xl px-2 py-1 bg-white">
              <Layers className="w-4 h-4" />
              <button
                className={`text-sm px-2 py-1 rounded-lg ${variant==='v1' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setVariant('v1')}
                aria-pressed={variant==='v1'}
              >Вариант 1</button>
              <button
                className={`text-sm px-2 py-1 rounded-lg ${variant==='v2' ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setVariant('v2')}
                aria-pressed={variant==='v2'}
              >Вариант 2</button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input data-testid="toggle-descriptions" type="checkbox" checked={showDescriptions} onChange={() => setShowDescriptions(v => !v)} /> Описание
            </label>
          </div>
        </div>

        {variant === 'v1' ? <Variant1 showDescriptions={showDescriptions} /> : <Variant2 showDescriptions={showDescriptions} />}
      </div>
    </div>
  );
}
