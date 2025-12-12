# PostHog Analytics Events

This document describes all custom analytics events tracked in the Jitterliss application.

## Configuration

PostHog is initialized in `src/app/providers.tsx` with:
- **Autocapture**: Enabled (automatic click, form, and interaction tracking)
- **Heatmaps**: Enabled
- **Pageview tracking**: Enabled
- **Page leave tracking**: Enabled

Environment variables:
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL

---

## Homepage Events

### `tool_card_clicked`
Triggered when a user clicks on any tool card in the hero section.

| Property | Type | Description |
|----------|------|-------------|
| `tool_name` | string | Name of the tool (e.g., "Caffeine Half-Life Calculator") |
| `tool_href` | string | URL path of the tool |

### `testimonial_lightbox_opened`
Triggered when a user clicks to enlarge a testimonial image.

| Property | Type | Description |
|----------|------|-------------|
| `image` | string | Path to the testimonial image |
| `testimonial_index` | number | Position of the testimonial (1, 2, or 3) |

### `coffee_banner_clicked`
Triggered when a user clicks the "Looking for Jitterliss coffee?" banner.

| Property | Type | Description |
|----------|------|-------------|
| `source` | string | Always "homepage_banner" |

### `about_section_cta_clicked`
Triggered when a user clicks the CTA button in the about section.

| Property | Type | Description |
|----------|------|-------------|
| `cta_text` | string | Text of the CTA button |
| `source` | string | Always "about_section" |

---

## Quit Caffeine Calculator Events

### `quit_calculator_started`
Triggered when the user adds their first drink to the calculator.

| Property | Type | Description |
|----------|------|-------------|
| `first_drink_name` | string | Name of the first drink added |
| `first_drink_caffeine` | number | Caffeine content in mg |

### `quit_calculator_step_changed`
Triggered when the user navigates between steps.

| Property | Type | Description |
|----------|------|-------------|
| `from_step` | number | Step number they're leaving (1-4) |
| `to_step` | number | Step number they're going to (1-4) |
| `total_caffeine` | number | Total daily caffeine in mg |

### `quit_calculator_completed`
Triggered when the user completes the calculator and downloads the PDF.

| Property | Type | Description |
|----------|------|-------------|
| `total_caffeine` | number | Total daily caffeine in mg |
| `drinks_count` | number | Number of drinks in their plan |
| `start_date` | string | Selected start date |
| `plan_duration_days` | number | Always 14 |

### `pdf_downloaded`
Triggered when the user downloads their detox plan PDF.

| Property | Type | Description |
|----------|------|-------------|
| `total_caffeine` | number | Total daily caffeine in mg |
| `drinks_count` | number | Number of drinks in their plan |
| `start_date` | string | Selected start date |

### `external_product_clicked`
Triggered when the user clicks on a product recommendation link.

| Property | Type | Description |
|----------|------|-------------|
| `product_name` | string | Name of the product |
| `product_link` | string | URL of the product |
| `category` | string | Product category (only in alternatives section) |
| `day` | number | Day number (only in daily schedule) |
| `quantity` | number | Quantity needed (only in shopping list) |
| `source` | string | "alternatives_section", "daily_schedule", or "shopping_list" |

---

## Caffeine Half-Life Calculator Events

### `halflife_calculator_drink_added`
Triggered when the user adds a drink to the calculator.

| Property | Type | Description |
|----------|------|-------------|
| `drink_name` | string | Name of the drink |
| `caffeine_mg` | number | Caffeine content in mg |
| `time_consumed` | string | Time the drink was consumed (HH:MM format) |
| `is_custom_drink` | boolean | Whether it's a custom drink or from the list |
| `total_drinks` | number | Total drinks after adding |

### `halflife_calculation_viewed`
Triggered when the user views meaningful calculation results.

| Property | Type | Description |
|----------|------|-------------|
| `total_drinks` | number | Number of drinks |
| `total_caffeine_mg` | number | Total caffeine consumed |
| `caffeine_at_bedtime_mg` | number | Caffeine remaining at bedtime |
| `bedtime` | string | User's bedtime (HH:MM format) |
| `sleep_impact` | string | "high", "moderate", "mild", or "minimal" |

---

## Make a Bet Page Events

### `bet_form_submitted`
Triggered when the user attempts to submit a bet.

| Property | Type | Description |
|----------|------|-------------|
| `bet_amount` | number | Dollar amount of the bet |
| `has_friend_email` | boolean | Whether friend email was provided |
| `has_friend_name` | boolean | Whether friend name was provided |
| `goal_length` | number | Character length of the goal |
| `deadline` | string | Selected deadline date |

---

## Caffeine List Page Events

### `caffeine_list_searched`
Triggered when the user searches the caffeine list.

| Property | Type | Description |
|----------|------|-------------|
| `search_term` | string | The search query |
| `results_count` | number | Number of matching results |

### `caffeine_list_filtered`
Triggered when the user changes category filters.

| Property | Type | Description |
|----------|------|-------------|
| `selected_categories` | string[] | Array of selected category names |
| `category_count` | number | Number of categories selected |

---

## Motivators Page Events

### `motivator_tab_switched`
Triggered when the user switches between Quit and Detox tabs.

| Property | Type | Description |
|----------|------|-------------|
| `tab` | string | "quit" or "detox" |
| `previous_tab` | string | The tab they were on before |

### `motivators_cta_clicked`
Triggered when the user clicks the CTA to start their plan.

| Property | Type | Description |
|----------|------|-------------|
| `active_tab` | string | "quit" or "detox" |
| `cta_type` | string | "quit_plan" or "detox_plan" |

---

## Decaf Benefits Page Events

### `decaf_benefits_source_clicked`
Triggered when the user clicks on a source/citation link.

| Property | Type | Description |
|----------|------|-------------|
| `source_name` | string | Name of the source |
| `source_url` | string | URL of the source |
| `benefit_title` | string | Title of the benefit section |

---

## Automatic Events (via Autocapture)

PostHog automatically captures:
- **`$pageview`** - When a page is loaded
- **`$pageleave`** - When a user leaves a page
- **`$autocapture`** - Clicks, form submissions, and other interactions
- **Heatmap data** - Mouse movements and click positions

---

## Best Practices

1. **Event Naming**: Use `snake_case` for all event names
2. **Property Naming**: Use `snake_case` for all property names
3. **Consistency**: Include `source` property when the same action can happen in multiple places
4. **Context**: Include relevant context (e.g., `total_caffeine`) to enable meaningful analysis

---

## Viewing Events

1. Log in to PostHog at https://us.posthog.com
2. Go to **Events** to see the event stream
3. Go to **Insights** to create charts and funnels
4. Go to **Dashboards** to create overview dashboards

### Suggested Funnels

1. **Calculator Completion Funnel**:
   - `quit_calculator_started` → `quit_calculator_step_changed` (to step 4) → `pdf_downloaded`

2. **Tool Engagement Funnel**:
   - `$pageview` (homepage) → `tool_card_clicked` → Calculator completion

3. **Motivator to Action Funnel**:
   - `$pageview` (motivators) → `motivators_cta_clicked` → `quit_calculator_started`
