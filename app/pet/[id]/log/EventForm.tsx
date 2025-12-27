type Props = {
  eventType: string;
  value: any;
  onChange: (v: any) => void;
};

export default function EventForm({ eventType, value, onChange }: Props) {
  switch (eventType) {
    case "medication":
      return (
        <select
          value={value.type ?? ""}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
        >
          <option value="" disabled hidden>Select a medication type</option>
          <option value="ASM">Antiseizure (ASM & AEM)</option>
          <option value="OTHER">Other</option>
        </select>
      );
    case "feeding":
      return (
        <select
          value={value.type ?? ""}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
        >
          <option value="" disabled hidden>Select a feeding type</option>
          <option value="kibble">Kibble</option>
          <option value="fresh">Fresh</option>
          <option value="treat">Treat</option>
          <option value="wet">Wet</option>
          <option value="raw">Raw</option>
          <option value="mixed">Mixed</option>
          <option value="other">Other</option>
        </select>
      );
    case "activity":
      return (
        <select
          value={value.type ?? ""}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
        >
          <option value="" disabled hidden>Select an activity type</option>
          <option value="walk">Walk</option>
          <option value="playtime">Playtime</option>
          <option value="park">Park</option>
          <option value="training">Training</option>
          <option value="grooming">Grooming</option>
          <option value="vet_visit">Vet Visit</option>
          <option value="other">Other</option>
        </select>
      );
    case "change":
      return (
        <input
          placeholder="Change description"
          className="w-full border rounded p-2"
          value={value.label ?? ""}
          onChange={(e) => onChange({ ...value, label: e.target.value })}
        />
      );

    default:
      return null;
  }
}
