import { useAccessibility } from '../../hooks/useAccessibility'

function ToggleRow({
  label,
  description,
  pressed,
  onToggle,
}: {
  label: string
  description: string
  pressed: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-label={label}
        aria-checked={pressed}
        onClick={onToggle}
        className={`inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          pressed ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform ${
            pressed ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function ScaleButton({
  value,
  current,
  label,
  onClick,
}: {
  value: number
  current: number
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
        current === value
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-pressed={current === value}
    >
      {label}
    </button>
  )
}

export default function A11yPanel() {
  const {
    textScale,
    lineHeight,
    letterSpacing,
    dyslexiaFont,
    highContrast,
    darkMode,
    reduceMotion,
    focusOutlines,
    setTextScale,
    toggleLineHeight,
    toggleLetterSpacing,
    toggleDyslexiaFont,
    toggleHighContrast,
    toggleDarkMode,
    toggleReduceMotion,
    toggleFocusOutlines,
    resetAll,
  } = useAccessibility()

  return (
    <div className="w-80 space-y-5 p-1">
      <h2 className="text-base font-semibold text-gray-900">
        Accessibility Settings
      </h2>

      <section aria-labelledby="text-size-heading">
        <h3 id="text-size-heading" className="mb-2 text-sm font-medium text-gray-700">
          Text Size
        </h3>
        <div className="flex gap-2" role="group" aria-label="Text size options">
          <ScaleButton value={100} current={textScale} label="100%" onClick={() => setTextScale(100)} />
          <ScaleButton value={125} current={textScale} label="125%" onClick={() => setTextScale(125)} />
          <ScaleButton value={150} current={textScale} label="150%" onClick={() => setTextScale(150)} />
        </div>
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-3" aria-label="Text and layout toggles">
        <ToggleRow
          label="Line Height"
          description="Increase spacing between lines"
          pressed={lineHeight}
          onToggle={toggleLineHeight}
        />
        <ToggleRow
          label="Letter Spacing"
          description="Increase spacing between characters"
          pressed={letterSpacing}
          onToggle={toggleLetterSpacing}
        />
        <ToggleRow
          label="Dyslexia Font"
          description="Use OpenDyslexic font"
          pressed={dyslexiaFont}
          onToggle={toggleDyslexiaFont}
        />
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-3" aria-label="Color toggles">
        <ToggleRow
          label="High Contrast"
          description="Increase color contrast"
          pressed={highContrast}
          onToggle={toggleHighContrast}
        />
        <ToggleRow
          label="Dark Mode"
          description="Switch to dark color scheme"
          pressed={darkMode}
          onToggle={toggleDarkMode}
        />
      </section>

      <hr className="border-gray-200" />

      <section className="space-y-3" aria-label="Navigation toggles">
        <ToggleRow
          label="Reduce Motion"
          description="Pause animations and transitions"
          pressed={reduceMotion}
          onToggle={toggleReduceMotion}
        />
        <ToggleRow
          label="Focus Outlines"
          description="Always show visible focus rings"
          pressed={focusOutlines}
          onToggle={toggleFocusOutlines}
        />
      </section>

      <hr className="border-gray-200" />

      <button
        type="button"
        onClick={resetAll}
        className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      >
        Reset All Settings
      </button>
    </div>
  )
}
