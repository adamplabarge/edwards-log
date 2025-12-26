type Props = {
  eventType: string;
  value: any;
  onChange: (v: any) => void;
};

export default function EventForm({ eventType, value, onChange }: Props) {
  switch (eventType) {
    case "feeding":
      return (
        <select
          value={value.type ?? ""}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
          className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
        >
          <option value="">Select feeding type</option>
          <option value="kibble">Kibble</option>
          <option value="fresh">Fresh</option>
          <option value="treat">Treat</option>
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
