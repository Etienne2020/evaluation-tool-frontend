<template>
  <section class="prompt-editor" aria-label="Guidance prompt editor">
    <header class="prompt-header">
      <h2>Guidance Prompt</h2>
    </header>

    <div class="prompt-body">
      <textarea
        v-model="localPrompt"
        class="prompt-textarea"
        rows="8"
        placeholder="Write guidance or instructions for this task..."
      ></textarea>

      <button
        type="button"
        class="prompt-submit-button"
        @click="onSubmit"
      >
        Submit Prompt
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const localPrompt = ref('');

const onSubmit = () => {
  const value = localPrompt.value.trim();
  emit('submit', value);
};
</script>

<style scoped>
.prompt-editor {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background: radial-gradient(circle at top left, #020617, #020617 30%, #020617);
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.9),
    inset 0 0 0 1px rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
}

.prompt-header {
  margin-bottom: 0.75rem;
}

.prompt-header h2 {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #e5e7eb;
}

.prompt-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.prompt-textarea {
  width: 100%;
  min-height: 200px;
  padding: 0.75rem 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(75, 85, 99, 0.9);
  background-color: #020617;
  color: #e5e7eb;
  resize: vertical;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  outline: none;
  box-shadow:
    0 0 0 1px rgba(15, 23, 42, 0.9),
    inset 0 0 0 1px rgba(15, 23, 42, 0.9);
}

.prompt-textarea::placeholder {
  color: #6b7280;
}

.prompt-textarea:focus-visible {
  border-color: #38bdf8;
  box-shadow:
    0 0 0 1px rgba(56, 189, 248, 0.8),
    0 0 0 4px rgba(56, 189, 248, 0.25);
}

.prompt-submit-button {
  align-self: flex-end;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.9);
  background: radial-gradient(circle at top left, #0f172a, #0369a1);
  color: #e0f2fe;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.15s ease-out,
    transform 0.12s ease-out,
    box-shadow 0.12s ease-out,
    border-color 0.12s ease-out;
  box-shadow:
    0 10px 25px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.prompt-submit-button:hover {
  background: radial-gradient(circle at top left, #0b1120, #0284c7);
  transform: translateY(-1px);
  box-shadow:
    0 14px 32px rgba(15, 23, 42, 0.95),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.prompt-submit-button:active {
  transform: translateY(0);
  box-shadow:
    0 6px 14px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

@media (max-width: 640px) {
  .prompt-editor {
    padding-inline: 0.9rem;
  }
}
</style>


