import { InteractiveConsole } from "@/components/interactive-console";

export default function ConsolePage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">
        Execute SOC commands, inspect agent responses, and run sample
        investigations.
      </p>
      <InteractiveConsole />
    </div>
  );
}
