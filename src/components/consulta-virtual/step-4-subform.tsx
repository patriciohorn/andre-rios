import {
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldDescription,
  Field,
  FieldLabel,
  FieldError,
} from "../ui/field";
import { withForm } from "./hooks/form";
import { photosSchema, wizardFormOpts } from "./shared-form";
import { PhotoSlot } from "./components/PhotoSlot";
import { Button } from "@/components/ui/button";

const NAMED_SLOTS = [
  { name: "photos.front", label: "Front view" },
  { name: "photos.back", label: "Back view" },
  { name: "photos.leftSide", label: "Left side" },
  { name: "photos.rightSide", label: "Right side" },
] as const;

const MAX_ADDITIONAL = 4;

export const PhotosForm = withForm({
  ...wizardFormOpts,
  props: {
    step: 3,
    setStep: (_step: number) => {},
  },
  render: function Render({ form, step, setStep }) {
    return (
      <form.FormGroup
        name="photos"
        validators={{ onDynamic: photosSchema }}
        onGroupSubmit={() => form.handleSubmit()}
        onGroupSubmitInvalid={() => {}}
      >
        {(formGroup) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              formGroup.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* ═══ REQUIRED VIEWS ═══ */}
            <FieldSet>
              <FieldLegend>Clinical photos</FieldLegend>
              <FieldDescription>
                Please take these in good lighting, wearing fitted clothing or
                underwear, standing against a plain background. Dr. Ríos uses
                them to evaluate whether you're a candidate.
              </FieldDescription>

              <FieldGroup>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {NAMED_SLOTS.map(({ name, label }) => (
                    <form.AppField key={name} name={name}>
                      {(field) => (
                        <div>
                          <PhotoSlot
                            value={field.state.value}
                            onChange={(url) => field.handleChange(url)}
                            label={label}
                          />
                          {field.state.meta.isTouched &&
                            !field.state.meta.isValid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                        </div>
                      )}
                    </form.AppField>
                  ))}
                </div>
              </FieldGroup>
            </FieldSet>

            {/* ═══ ADDITIONAL PHOTOS ═══ */}
            <FieldSet>
              <FieldLegend>Additional photos (optional)</FieldLegend>
              <FieldDescription>
                Add up to {MAX_ADDITIONAL} more photos of the areas you'd like
                Dr. Ríos to focus on.
              </FieldDescription>

              <FieldGroup>
                <form.AppField name="photos.additionalPhotos" mode="array">
                  {(field) => {
                    const photos = field.state.value;
                    const remaining = MAX_ADDITIONAL - photos.length;

                    return (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {photos.map((url: string, i: number) => (
                          <PhotoSlot
                            key={`${url}-${i}`}
                            value={url}
                            label={`Photo ${i + 1}`}
                            removable
                            onChange={(newUrl) => {
                              if (newUrl === null) {
                                field.removeValue(i);
                              } else {
                                field.replaceValue(i, newUrl);
                              }
                            }}
                          />
                        ))}

                        {remaining > 0 && (
                          <PhotoSlot
                            value={null}
                            label="Add photo"
                            onChange={(url) => {
                              if (url) field.pushValue(url);
                            }}
                          />
                        )}
                      </div>
                    );
                  }}
                </form.AppField>
              </FieldGroup>
            </FieldSet>

            <div className="mt-8 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
              <form.AppForm>
                <form.SubscribeButton label="Submit" />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    );
  },
});
