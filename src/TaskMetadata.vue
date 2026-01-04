<template>
  <section class="task-metadata" aria-label="Task metadata">
    <header class="task-metadata-header">Sample Metadata</header>

    <dl class="task-metadata-grid">
      <template v-for="(value, key) in metadata" :key="key">
        <dt class="task-metadata-key">
          {{ formatKey(key) }}
        </dt>
        <dd class="task-metadata-value">
          {{ value }}
        </dd>
      </template>
    </dl>
  </section>
</template>

<script setup>
const props = defineProps({
  metadata: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formatKey = (rawKey) => {
  if (!rawKey) return '';
  const key = String(rawKey)
    .replace(/[_\-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();

  return key.charAt(0).toUpperCase() + key.slice(1);
};
</script>

<style scoped>
.task-metadata {
  width: 100%;
  max-width: 420px;
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: radial-gradient(circle at top left, #1e293b, #020617);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.9),
    inset 0 0 0 1px rgba(15, 23, 42, 0.9);
  color: #e5e7eb;
}

.task-metadata-header {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.task-metadata-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 0.75rem;
  align-items: baseline;
}

.task-metadata-key {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
  white-space: nowrap;
}

.task-metadata-value {
  font-size: 0.75rem;
  color: #e5e7eb;
  text-align: left;
  opacity: 0.9;
}

@media (max-width: 640px) {
  .task-metadata {
    padding-inline: 0.75rem;
  }

  .task-metadata-grid {
    gap: 0.2rem 0.75rem;
  }
}
</style>


