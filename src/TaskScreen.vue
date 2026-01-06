<template>
  <main class="task-screen">
    <section class="task-metadata-wrapper">
      <TaskMetadata :metadata="mockMetadata" />
    </section>

    <section class="task-turns">
      <article class="turn-card">
        <header class="turn-header">
          <h1 class="turn-title">Turn 1</h1>
        </header>

        <section class="turn-section">
          <PromptEditor @submit="handlePromptSubmit" />
        </section>

        <!-- Prompt Evaluation Form -->
        <section class="response-section">
          <div class="eval-field">
            <label>Source/Seed <span class="required">*</span></label>
            <textarea
              v-model="evaluation.source"
              class="eval-textarea"
              rows="1"
              placeholder="Ideal response for this prompt"
            ></textarea>
          </div>
          <div class="eval-field">
            <label>Academic Level <span class="required">*</span></label>
            <!--label>Error Type <span class="required">*</span></label-->
            <select
              v-model="evaluation.academicLevel"
              class="eval-select"
            >
              <option value="">Select an option</option>
              <option value="Undergraduate">
                Undergraduate
              </option>
              <option value="Master">
                Master
              </option>
              <option value="Doctoral">
                Doctoral
              </option>
            </select>
          </div>
          <div class="eval-field">
            <label>Solution <span class="required">*</span></label>
            <textarea
              v-model="evaluation.solution"
              class="eval-textarea"
              rows="10"
              placeholder="Ideal response for this prompt"
            ></textarea>
          </div>
          <div class="eval-field">
            <label>Short Answer <span class="required">*</span></label>
            <textarea
              v-model="evaluation.shortAnswer"
              class="eval-textarea"
              rows="1"
              placeholder="Ideal response for this prompt"
            ></textarea>
          </div>
          <div class="eval-field">
            <label>Units <span class="required"></span></label>
            <textarea
              v-model="evaluation.units"
              class="eval-textarea"
              rows="1"
              placeholder="Ideal response for this prompt"
            ></textarea>
          </div>
          <div class="eval-field">
            <label>Category from Taxonomy <span class="required"></span></label>
            <textarea
              v-model="evaluation.taxonomyCategory"
              class="eval-textarea"
              rows="1"
              placeholder="Category from Taxonomy"
            ></textarea>
          </div>
        </section>

        <!-- Response Section -->
        <section v-if="isLoading" class="response-section">
          <p class="loading-text">Generating response...</p>
        </section>

        <section v-else-if="response" class="response-section">
          <header class="response-header">
            <span class="model-badge">{{ response.model }}</span>
          </header>
          <div class="response-text">{{ response.text }}</div>

          <!-- Model Evaluation Form -->
          <form class="evaluation-form" @submit.prevent>
            <div class="eval-header">
              <h3 class="eval-title">Response Evaluation</h3>
              <button type="button" class="eval-toggle" @click="evalFormExpanded = !evalFormExpanded">
                <span class="eval-toggle-icon">{{ evalFormExpanded ? '▼' : '▶' }}</span>
                Evaluation Form
              </button> <!-- Evaluation Form – {{ evalFormStatus }} -->
            </div>

            <div v-show="evalFormExpanded" class="eval-content">
              

              <!-- Failure Section -> Response Evaluation Section -->
              <div class="eval-section failure-section">
                <h4 class="eval-section-title">Failure Analysis</h4>

                <!--div class="eval-field">
                  <label>Failure Reason <span class="required">*</span></label>
                  <textarea
                    v-model="evaluation.failure.failureReason"
                    class="eval-textarea"
                    rows="3"
                    placeholder="Describe the primary reason for failure..."
                  ></textarea>
                </div-->

                <div class="eval-field">
                  <label>Result <span class="required">*</span></label>
                  <select
                    v-model="evaluation.passOrFail"
                    class="eval-select"
                  >
                    <option value="">Select an option</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </div>

                <!--div
                  v-if="evaluation.failure.hallucinations === 'True'"
                  class="eval-field"
                >
                  <label>Hallucination Justification</label>
                  <textarea
                    v-model="evaluation.failure.hallucinationJustification"
                    class="eval-textarea"
                    rows="3"
                    placeholder="Explain why the response is considered hallucinated..."
                  ></textarea>
                </div>

                <div class="eval-field">
                  <label>Code Error <span class="required">*</span></label>
                  <select
                    v-model="evaluation.failure.codeError"
                    class="eval-select"
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div v-if="evaluation.failure.codeError === 'Yes'">
                  <div class="eval-field">
                    <label>Error Type <span class="required">*</span></label>
                    <select
                      v-model="evaluation.failure.codeErrorType"
                      class="eval-select"
                    >
                      <option value="">Select an option</option>
                      <option value="Syntax Errors > Missing Semicolon / Braces">
                        Syntax Errors &gt; Missing Semicolon / Braces
                      </option>
                      <option value="Syntax Errors > Incorrect Indentation">
                        Syntax Errors &gt; Incorrect Indentation
                      </option>
                      <option value="Syntax Errors > Mismatched Parentheses">
                        Syntax Errors &gt; Mismatched Parentheses
                      </option>
                      <option value="Syntax Errors > Invalid Token / Character">
                        Syntax Errors &gt; Invalid Token / Character
                      </option>
                      <option value="Syntax Errors > Misuse of Reserved Keywords">
                        Syntax Errors &gt; Misuse of Reserved Keywords
                      </option>
                      <option value="Logical Errors > Off-by-One Errors">
                        Logical Errors &gt; Off-by-One Errors
                      </option>
                      <option value="Logical Errors > Infinite Loops">
                        Logical Errors &gt; Infinite Loops
                      </option>
                      <option value="Logical Errors > Incorrect Conditionals">
                        Logical Errors &gt; Incorrect Conditionals
                      </option>
                      <option value="Logical Errors > Misplaced Calculations">
                        Logical Errors &gt; Misplaced Calculations
                      </option>
                      <option value="Logical Errors > Wrong Algorithmic Logic">
                        Logical Errors &gt; Wrong Algorithmic Logic
                      </option>
                      <option value="Runtime Errors > Division by Zero">
                        Runtime Errors &gt; Division by Zero
                      </option>
                      <option value="Runtime Errors > Null / None Reference">
                        Runtime Errors &gt; Null / None Reference
                      </option>
                      <option value="Runtime Errors > Type Casting Errors">
                        Runtime Errors &gt; Type Casting Errors
                      </option>
                      <option value="Runtime Errors > Index Out of Bounds">
                        Runtime Errors &gt; Index Out of Bounds
                      </option>
                      <option value="Runtime Errors > Memory Access Violation">
                        Runtime Errors &gt; Memory Access Violation
                      </option>
                      <option value="Semantic Errors > Misuse of Operators">
                        Semantic Errors &gt; Misuse of Operators
                      </option>
                      <option value="Semantic Errors > Wrong Function Usage">
                        Semantic Errors &gt; Wrong Function Usage
                      </option>
                      <option value="Semantic Errors > Misunderstood Constructs">
                        Semantic Errors &gt; Misunderstood Constructs
                      </option>
                      <option value="Semantic Errors > Variable Shadowing">
                        Semantic Errors &gt; Variable Shadowing
                      </option>
                      <option value="Resource Errors > Memory Leak">
                        Resource Errors &gt; Memory Leak
                      </option>
                      <option value="Resource Errors > Deadlock">
                        Resource Errors &gt; Deadlock
                      </option>
                      <option value="Resource Errors > Race Conditions">
                        Resource Errors &gt; Race Conditions
                      </option>
                      <option value="Resource Errors > File Handle Leak">
                        Resource Errors &gt; File Handle Leak
                      </option>
                      <option value="Resource Errors > Stack Overflow">
                        Resource Errors &gt; Stack Overflow
                      </option>
                      <option value="Compilation Errors > Missing Header / Import">
                        Compilation Errors &gt; Missing Header / Import
                      </option>
                      <option value="Compilation Errors > Type Mismatch">
                        Compilation Errors &gt; Type Mismatch
                      </option>
                      <option value="Compilation Errors > Duplicate Definitions">
                        Compilation Errors &gt; Duplicate Definitions
                      </option>
                      <option value="Compilation Errors > Unresolved References">
                        Compilation Errors &gt; Unresolved References
                      </option>
                      <option value="Compilation Errors > Illegal Assignment">
                        Compilation Errors &gt; Illegal Assignment
                      </option>
                      <option value="Security Errors > Buffer Overflow">
                        Security Errors &gt; Buffer Overflow
                      </option>
                      <option value="Security Errors > SQL Injection">
                        Security Errors &gt; SQL Injection
                      </option>
                      <option value="Security Errors > Cross-Site Scripting (XSS)">
                        Security Errors &gt; Cross-Site Scripting (XSS)
                      </option>
                      <option value="Security Errors > Improper Input Validation">
                        Security Errors &gt; Improper Input Validation
                      </option>
                      <option value="Security Errors > Insecure Deserialization">
                        Security Errors &gt; Insecure Deserialization
                      </option>
                      <option value="Environment Errors > Dependency Conflicts">
                        Environment Errors &gt; Dependency Conflicts
                      </option>
                      <option value="Environment Errors > Missing Env Variables">
                        Environment Errors &gt; Missing Env Variables
                      </option>
                      <option value="Environment Errors > Incorrect Path / Permission">
                        Environment Errors &gt; Incorrect Path / Permission
                      </option>
                      <option value="Environment Errors > Incompatible OS">
                        Environment Errors &gt; Incompatible OS
                      </option>
                      <option value="Environment Errors > Hardware Constraints">
                        Environment Errors &gt; Hardware Constraints
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="eval-field">
                    <label>Code Error Details</label>
                    <textarea
                      v-model="evaluation.failure.codeErrorDetails"
                      class="eval-textarea"
                      rows="3"
                      placeholder="Describe the code error or bug..."
                    ></textarea>
                  </div>
                </div  -->
              </div>
            </div>
          </form>
        </section>

        <!--section v-else-if="error" class="response-section">
          <p class="error-text">{{ error }}</p>
        </section-->
        <button
          type="button"
          class="prompt-submit-button"
          @click="onSubmit"
        >
          Save Evaluation
        </button>

      </article>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import TaskMetadata from './TaskMetadata.vue';
import PromptEditor from './PromptEditor.vue';

const mockMetadata = {
  language: 'JavaScript',
  subtopic: 'Asynchronous Patterns',
  taskCategory: 'Refactoring',
  projectName: 'LT Frontend Sandbox',
};

const currentPrompt = ref('');
const response = ref(null);
const isLoading = ref(false);
const error = ref(null);
const evalFormExpanded = ref(true);

//const passOrFail = ''


const createEmptyEvaluation = () => ({
  source: '',
  academicLevel: '',
  solution: '',
  shortAnswer: '',
  units: '',
  taxonomyCategory: '',
  passOrFail: ''
});

const evaluation = ref(createEmptyEvaluation());

/*const evalFormStatus = computed(() => {
  const scores = evaluation.value.scores;
  const hasAnyScore = Object.values(scores).some(v => v > 0);
  return hasAnyScore ? 'IN PROGRESS' : 'PENDING';
});*/

/*const setRating = (key, value) => {
  evaluation.value.scores[key] = value;
};

/*const getStarFill = (key, starIndex) => {
  const rating = hoverRatings[key] ?? evaluation.value.scores[key];
  const starValue = rating - (starIndex - 1);
  return Math.max(0, Math.min(1, starValue));
};*/

const handlePromptSubmit = async (promptText) => {
  currentPrompt.value = promptText;
  response.value = null;
  error.value = null;
  evaluation.value = createEmptyEvaluation();
  //Object.keys(hoverRatings).forEach(key => hoverRatings[key] = null);

  if (!promptText) return;

  isLoading.value = true;

  //TODO
  const API_URL = import.meta.env.VITE_API_URL
  //let selectedModel = 'deepseek-r1-0528'
  let selectedModel = 'o3'
  console.log(API_URL);
  try {
    const res = await fetch(`${API_URL}/api/v1/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
      prompt: promptText,
      model: selectedModel
      }),
    });
    //console.log(res)
    console.log(res.ok)
    //let t = await res.text()
    //console.log(t)

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    console.log(data)
    response.value = { model: data.model, text: data.text };
  } catch (err) {
    error.value = err.message || 'Failed to generate response';
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = () => {
  console.log('TODO')
  //const value = localPrompt.value.trim();
  //emit('submit', value);
};

</script>

<style scoped>
.task-screen {
  min-height: 100vh;
  padding: 1.5rem;
  color: #f9fafb;
}

.task-metadata-wrapper {
  margin-bottom: 1.5rem;
}

.task-turns {
  width: 100%;
}

.turn-card {
  width: 100%;
  border-radius: 0.9rem;
  background: radial-gradient(circle at top left, #020617, #020617 40%, #020617);
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 22px 45px rgba(15, 23, 42, 0.95),
    inset 0 0 0 1px rgba(15, 23, 42, 0.9);
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.turn-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.turn-title {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-size: 1.4rem;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #facc15;
}

.turn-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* Response Section */
.response-section {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.response-header {
  margin-bottom: 0.75rem;
}

.model-badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #a5f3fc;
  background: rgba(6, 182, 212, 0.2);
  border: 1px solid rgba(6, 182, 212, 0.4);
  border-radius: 4px;
}

.response-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e5e7eb;
  white-space: pre-wrap;
}

.loading-text {
  color: #94a3b8;
  font-style: italic;
}

.error-text {
  color: #f87171;
}

/* Evaluation Form */
.evaluation-form {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(75, 85, 99, 0.4);
}

.eval-header {
  margin-bottom: 1rem;
}

.eval-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #22d3ee;
  margin-bottom: 0.5rem;
}

.eval-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #facc15;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.eval-toggle:hover {
  color: #fde047;
}

.eval-toggle-icon {
  font-size: 0.7rem;
}

.eval-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Score Block */
.eval-score-block {
  padding: 1rem;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 0.5rem;
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.score-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f9fafb;
  margin-bottom: 0.25rem;
  display: block;
}

.required {
  color: #ef4444;
}

.score-description {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

/* Star Rating */
.star-rating {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-bottom: 1rem;
  user-select: none;
}

.star-container {
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
}

.star {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.5rem;
  line-height: 1;
  transition: opacity 0.15s ease;
}

.star-empty {
  color: #4b5563;
}

.star-half-fill {
  color: #fbbf24;
  clip-path: inset(0 50% 0 0);
  opacity: 0;
}

.star-half-fill.visible {
  opacity: 1;
}

.star-full-fill {
  color: #fbbf24;
  opacity: 0;
}

.star-full-fill.visible {
  opacity: 1;
}

.star-click-zone {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
}

.star-click-left {
  left: 0;
}

.star-click-right {
  right: 0;
}

.star-container:hover .star-empty {
  color: #6b7280;
}

.rating-value {
  margin-left: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fbbf24;
  min-width: 2rem;
}

.rationale-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #f9fafb;
  margin-bottom: 0.35rem;
  display: block;
}

/* Failure Section */
.eval-section {
  padding: 1rem;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 0.5rem;
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.eval-section-title {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
}

.eval-field {
  margin-bottom: 0.85rem;
}

.eval-field label {
  display: block;
  font-size: 0.85rem;
  color: #d1d5db;
  margin-bottom: 0.35rem;
}

.eval-select,
.eval-input,
.eval-textarea {
  width: 100%;
  padding: 0.5rem 0.65rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(75, 85, 99, 0.7);
  background-color: #020617;
  color: #e5e7eb;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.eval-select:focus,
.eval-input:focus,
.eval-textarea:focus {
  border-color: #38bdf8;
}

.eval-input::placeholder,
.eval-textarea::placeholder {
  color: #6b7280;
}

.eval-textarea {
  resize: vertical;
  min-height: 70px;
  font-family: inherit;
}


/* ----- copied-pasted: ----- */
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

</style>
