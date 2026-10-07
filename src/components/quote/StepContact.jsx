import { Label, TextInput } from "./Field.jsx";

export default function StepContact({ form, errors, update }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted">
        Where should Ridgeline Roofing send the estimate?
      </p>

      <div>
        <Label>Name</Label>
        <TextInput
          id="name"
          maxLength={100}
          value={form.name}
          onChange={(v) => update({ name: v })}
          placeholder="Full name"
          autoComplete="name"
          error={errors.name}
        />
      </div>

      <div>
        <Label>Phone</Label>
        <TextInput
          id="phone"
          maxLength={30}
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(v) => update({ phone: v })}
          placeholder="(555) 555-5555"
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <div>
        <Label>Email</Label>
        <TextInput
          id="email"
          maxLength={200}
          type="email"
          inputMode="email"
          value={form.email}
          onChange={(v) => update({ email: v })}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div>
        <Label>Job address</Label>
        <TextInput
          id="address"
          maxLength={300}
          value={form.address}
          onChange={(v) => update({ address: v })}
          placeholder="Street, city, state"
          autoComplete="street-address"
          error={errors.address}
        />
      </div>
    </div>
  );
}
