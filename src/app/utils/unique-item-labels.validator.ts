import {
  customError,
  type FieldTree,
  type PathKind,
  type ReadonlyArrayLike,
  type TreeValidator,
  type ValidationError,
} from '@angular/forms/signals';

const DUPLICATE_LABEL_KIND = 'duplicateLabel';

/**
 * Error kind for duplicate item labels in signal forms.
 */
export const UNIQUE_ITEM_LABELS_ERROR_KIND = DUPLICATE_LABEL_KIND;

export interface ItemWithLabel {
  label: string;
}

/** Field tree for an array item that has a label subfield. */
interface ItemFieldTreeWithLabel {
  label: FieldTree<unknown> | undefined;
}

/**
 * Returns a TreeValidator that ensures each item in an array has a unique label.
 * Attaches a 'duplicateLabel' error to each item's label field when duplicates exist.
 * Use with validateTree(schemaPath.items, uniqueItemLabelsValidator()).
 *
 * @returns A TreeValidator to use with validateTree() on the items array path.
 */
export function uniqueItemLabelsValidator<TItem extends ItemWithLabel>(): TreeValidator<
  TItem[],
  PathKind.Child
> {
  return (ctx) => {
    const items = ctx.value() ?? [];
    if (items.length <= 1) {
      return null;
    }

    const labelToIndices = new Map<string, number[]>();
    items.forEach((item, index) => {
      const label = (item?.label ?? '').trim();
      if (label === '') return;
      const indices = labelToIndices.get(label) ?? [];
      indices.push(index);
      labelToIndices.set(label, indices);
    });

    const errors: ValidationError.WithOptionalField[] = [];
    const itemsFieldTree = ctx.fieldTree as ReadonlyArrayLike<
      ItemFieldTreeWithLabel | undefined
    >;
    for (const [, indices] of labelToIndices) {
      if (indices.length <= 1) continue;
      for (const index of indices) {
        const itemTree = itemsFieldTree[index];
        const labelField = itemTree?.label;
        if (labelField != null) {
          errors.push(
            customError({
              kind: DUPLICATE_LABEL_KIND,
              message: 'Item labels must be unique',
              fieldTree: labelField,
            })
          );
        }
      }
    }

    return errors.length > 0 ? errors : null;
  };
}
