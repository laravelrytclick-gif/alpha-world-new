# Consultation Modal Usage Guide

The consultation modal is now available globally throughout your application using React Context. You can open it from any component with just a few lines of code.

## How to Use

### 1. Import the Hook

```tsx
import { useConsultationModal } from "../../contexts/ConsultationModalContext";
```

### 2. Use the Hook in Your Component

```tsx
export default function MyComponent() {
  const { openModal, closeModal, isModalOpen } = useConsultationModal();

  return (
    <button onClick={openModal}>
      Open Consultation Form
    </button>
  );
}
```

### 3. Available Methods

- `openModal()` - Opens the consultation modal
- `closeModal()` - Closes the consultation modal
- `isModalOpen` - Boolean indicating if modal is currently open

## Examples

### Simple Button

```tsx
"use client";

import { useConsultationModal } from "../../contexts/ConsultationModalContext";

export default function MyButton() {
  const { openModal } = useConsultationModal();
  
  return (
    <button onClick={openModal} className="btn-primary">
      Get Started
    </button>
  );
}
```

### Using the Pre-built Button Component

```tsx
import BookConsultationButton from "./Components/BookConsultationButton";

export default function MyPage() {
  return (
    <div>
      <BookConsultationButton variant="primary" size="lg">
        Book FREE Consultation
      </BookConsultationButton>
    </div>
  );
}
```

### Conditional Rendering Based on Modal State

```tsx
"use client";

import { useConsultationModal } from "../../contexts/ConsultationModalContext";

export default function MyComponent() {
  const { openModal, isModalOpen } = useConsultationModal();
  
  return (
    <div>
      <button onClick={openModal}>
        {isModalOpen ? "Modal is Open" : "Open Modal"}
      </button>
    </div>
  );
}
```

## Notes

- The modal is automatically rendered globally via `ConditionalLayout`
- No need to import or render the modal component manually
- The modal includes the contact form automatically
- Works on both desktop and mobile views

