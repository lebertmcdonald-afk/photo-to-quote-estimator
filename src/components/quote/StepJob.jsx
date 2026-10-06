import { ChipGroup, Error, Label, TextInput } from "./Field.jsx";

const JOB_TYPES = [
  { value: "full", label: "Full replacement" },
  { value: "repair", label: "Repair" },
  { value: "unsure", label: "Not sure" },
];

const MATERIALS = [
  { value: "asphalt", label: "Asphalt shingles" },
  { value: "metal", label: "Metal" },
  { value: "tile", label: "Tile" },
  { value: "flat", label: "Flat" },
  { value: "unsure", label: "Not sure" },
];

const STORIES = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3+", label: "3+" },
];

export default function StepJob({ form, errors, update }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Job type</Label>
        <ChipGroup
          name="Job type"
          value={form.jobType}
          onChange={(v) => update({ jobType: v })}
          options={JOB_TYPES}
          error={errors.jobType}
        />
      </div>

      <div>
        <Label hint="Approximate is fine">Roof size (sq ft)</Label>
        <TextInput
          id="sqFt"
          type="number"
          inputMode="numeric"
          value={form.sqFt}
          onChange={(v) => update({ sqFt: v })}
          placeholder="e.g. 2100"
          error={!form.sqFtUnknown ? errors.sqFt : null}
        />
        <label className="mt-2 flex cursor-pointer items-center gap-2 text-[14px] text-muted">
          <input
            type="checkbox"
            checked={form.sqFtUnknown}
            onChange={(e) => update({ sqFtUnknown: e.target.checked, sqFt: "" })}
            className="h-4 w-4 accent-blue"
          />
          I'm not sure
        </label>
      </div>

      <div>
        <Label>Roof material</Label>
        <ChipGroup
          name="Roof material"
          value={form.material}
          onChange={(v) => update({ material: v })}
          options={MATERIALS}
          error={errors.material}
        />
      </div>

      <div>
        <Label>Stories</Label>
        <ChipGroup
          name="Stories"
          value={form.stories}
          onChange={(v) => update({ stories: v })}
          options={STORIES}
          error={errors.stories}
        />
      </div>
    </div>
  );
}
