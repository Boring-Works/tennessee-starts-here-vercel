# Spacing System Pattern Library

> Real-world examples showing how to use spacing tokens in common components and layouts.

---

## Component Patterns

### Icon + Text Combinations

**Tight (Badges, Labels)**

```tsx
<span className="inline-flex items-center gap-[var(--gap-xs)]">
  <Star className="w-3 h-3" />
  <span className="text-xs">Featured</span>
</span>
```

**Standard (Most Common)**

```tsx
<div className="flex items-center gap-[var(--gap-md)]">
  <MapPin className="w-4 h-4" />
  <span>Rocky Mount, Tennessee</span>
</div>
```

**Comfortable (Hero, Large UI)**

```tsx
<div className="flex items-center gap-[var(--gap-lg)]">
  <Calendar className="w-5 h-5" />
  <span className="text-lg">March 4, 2026</span>
</div>
```

**Spacious (Feature Callouts)**

```tsx
<div className="flex items-center gap-[var(--gap-xl)]">
  <Clock className="w-6 h-6" />
  <span className="text-xl">Wed-Sat, 10am-4pm</span>
</div>
```

---

### Buttons

**Small Button**

```tsx
<button className="px-[var(--space-lg)] py-[var(--space-sm)] text-sm">Learn More</button>
```

**Standard Button**

```tsx
<button className="px-[var(--space-xl)] py-[var(--space-md)] text-base">Book Tickets</button>
```

**Large Button (CTA)**

```tsx
<button className="px-[var(--space-2xl)] py-[var(--space-lg)] text-lg">Plan Your Visit</button>
```

**Button Group**

```tsx
<div className="flex gap-[var(--gap-md)]">
  <button className="px-[var(--space-xl)] py-[var(--space-md)]">Primary</button>
  <button className="px-[var(--space-xl)] py-[var(--space-md)]">Secondary</button>
</div>
```

---

### Cards

**Compact Card**

```tsx
<div className="p-[var(--spacing-card-sm)] bg-white rounded-sm shadow-[var(--shadow-md)]">
  <h3 className="text-base mb-[var(--space-sm)]">Card Title</h3>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

**Standard Card**

```tsx
<div className="p-[var(--spacing-card-md)] md:p-[var(--spacing-card-lg)] bg-white rounded-sm shadow-[var(--shadow-md)]">
  <div className="flex items-center gap-[var(--gap-md)] mb-[var(--space-md)]">
    <MapPin className="w-4 h-4" />
    <span className="text-xs uppercase tracking-wider text-secondary">Location</span>
  </div>
  <h3 className="text-xl font-serif mb-[var(--space-sm)]">Event Title</h3>
  <p className="text-gray-600 mb-[var(--space-lg)]">Event description goes here.</p>
  <button className="px-[var(--space-xl)] py-[var(--space-md)]">Book Now</button>
</div>
```

**Featured Card (Dark Background)**

```tsx
<div className="p-[var(--spacing-card-lg)] bg-primary text-white rounded-sm shadow-[var(--shadow-gold-lg)]">
  <div className="flex items-center gap-[var(--gap-md)] mb-[var(--space-lg)]">
    <Star className="w-5 h-5 text-accent" />
    <span className="text-xs uppercase tracking-wider text-accent">Signature Event</span>
  </div>
  <h3 className="text-2xl font-serif mb-[var(--space-md)]">America 250 Gala</h3>
  <p className="text-white/80 mb-[var(--space-xl)]">
    Celebrate the nation's 250th birthday at the site where Tennessee began.
  </p>
  <button className="px-[var(--space-2xl)] py-[var(--space-lg)] bg-accent text-primary">
    Reserve Your Spot
  </button>
</div>
```

---

### Card Grids

**Compact Grid (3 columns)**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-md)]">
  {items.map((item) => (
    <div key={item.id} className="p-[var(--spacing-card-sm)] bg-white">
      {item.content}
    </div>
  ))}
</div>
```

**Standard Grid (2-3 columns)**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
  {cards.map((card) => (
    <div key={card.id} className="p-[var(--spacing-card-md)] bg-white">
      {card.content}
    </div>
  ))}
</div>
```

**Wide Grid (2 columns)**

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-xl)]">
  {features.map((feature) => (
    <div key={feature.id} className="p-[var(--spacing-card-lg)] bg-white">
      {feature.content}
    </div>
  ))}
</div>
```

**Hero Grid (Large Elements)**

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-3xl)]">
  <div className="p-[var(--spacing-card-lg)]">{/* Left column */}</div>
  <div className="p-[var(--spacing-card-lg)]">{/* Right column */}</div>
</div>
```

---

## Layout Patterns

### Page Container

**Mobile-First Responsive**

```tsx
<main className="px-[var(--layout-page-padding-mobile)] md:px-[var(--layout-page-padding-tablet)] lg:px-[var(--layout-page-padding-desktop)]">
  <div className="max-w-7xl mx-auto">{children}</div>
</main>
```

**Full-Width with Constrained Content**

```tsx
<main className="w-full">
  <div className="max-w-7xl mx-auto px-[var(--layout-page-padding-mobile)] lg:px-[var(--layout-page-padding-desktop)]">
    {children}
  </div>
</main>
```

---

### Section Spacing

**Standard Section**

```tsx
<section className="py-[var(--layout-section-y-mobile)] md:py-[var(--layout-section-y-tablet)] px-[var(--layout-page-padding-mobile)] lg:px-[var(--layout-page-padding-desktop)]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-serif mb-[var(--space-xl)]">Section Title</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-lg)]">{content}</div>
  </div>
</section>
```

**Compact Section**

```tsx
<section className="py-[var(--space-3xl)] px-[var(--layout-page-padding-mobile)]">
  <div className="max-w-5xl mx-auto">{content}</div>
</section>
```

**Hero Section**

```tsx
<section
  className="min-h-screen flex items-center"
  style={{ padding: `var(--space-7xl) var(--layout-page-padding-desktop) var(--space-4xl)` }}
>
  <div className="max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-3xl)]">
      {/* Left: Content */}
      <div className="space-y-[var(--space-xl)]">
        <h1 className="text-6xl font-serif">Hero Title</h1>
        <p className="text-xl">Hero description</p>
        <button className="px-[var(--space-2xl)] py-[var(--space-lg)]">Primary CTA</button>
      </div>
      {/* Right: Image/Feature */}
      <div>{heroVisual}</div>
    </div>
  </div>
</section>
```

---

### Content Stacking

**Vertical Spacing (Typography)**

```tsx
<article className="space-y-[var(--space-lg)]">
  <h1 className="text-4xl font-serif">Article Title</h1>
  <p className="text-xl text-gray-600">Subhead or intro paragraph</p>
  <p>Body paragraph with standard spacing.</p>
  <p>Another body paragraph.</p>
  <blockquote className="border-l-4 border-accent pl-[var(--space-lg)] py-[var(--space-md)]">
    Quote text with custom padding
  </blockquote>
  <p>More body text after quote.</p>
</article>
```

**Tight Stacking (Forms)**

```tsx
<form className="space-y-[var(--space-md)]">
  <div>
    <label className="block text-sm mb-[var(--space-xs)]">Email</label>
    <input className="w-full px-[var(--space-md)] py-[var(--space-sm)]" />
  </div>
  <div>
    <label className="block text-sm mb-[var(--space-xs)]">Password</label>
    <input className="w-full px-[var(--space-md)] py-[var(--space-sm)]" />
  </div>
  <button className="px-[var(--space-xl)] py-[var(--space-md)]">Sign In</button>
</form>
```

**Comfortable Stacking (Feature Sections)**

```tsx
<div className="space-y-[var(--space-2xl)]">
  {features.map((feature) => (
    <div key={feature.id} className="space-y-[var(--space-md)]">
      <div className="flex items-center gap-[var(--gap-md)]">
        <feature.icon className="w-5 h-5" />
        <h3 className="text-xl font-serif">{feature.title}</h3>
      </div>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  ))}
</div>
```

---

## Navigation Patterns

**Desktop Navigation**

```tsx
<nav className="flex items-center gap-[var(--gap-2xl)] px-[var(--layout-page-padding-desktop)]">
  <Logo />
  <div className="flex items-center gap-[var(--gap-lg)]">
    <a href="/visit" className="px-[var(--space-md)] py-[var(--space-sm)]">
      Visit
    </a>
    <a href="/events" className="px-[var(--space-md)] py-[var(--space-sm)]">
      Events
    </a>
    <a href="/about" className="px-[var(--space-md)] py-[var(--space-sm)]">
      About
    </a>
  </div>
  <button className="ml-auto px-[var(--space-xl)] py-[var(--space-md)]">Book Tickets</button>
</nav>
```

**Mobile Navigation Drawer**

```tsx
<div className="fixed inset-y-0 left-0 w-80 bg-primary p-[var(--space-xl)]">
  <div className="space-y-[var(--space-lg)]">
    <a href="/visit" className="block py-[var(--space-md)]">
      Visit
    </a>
    <a href="/events" className="block py-[var(--space-md)]">
      Events
    </a>
    <a href="/about" className="block py-[var(--space-md)]">
      About
    </a>
    <button className="w-full px-[var(--space-xl)] py-[var(--space-lg)] mt-[var(--space-2xl)]">
      Book Tickets
    </button>
  </div>
</div>
```

---

## Footer Patterns

**Multi-Column Footer**

```tsx
<footer className="bg-primary text-white py-[var(--space-5xl)] px-[var(--layout-page-padding-mobile)] lg:px-[var(--layout-page-padding-desktop)]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--gap-xl)]">
      {/* Column 1 */}
      <div className="space-y-[var(--space-md)]">
        <h4 className="text-lg font-serif">Visit</h4>
        <ul className="space-y-[var(--space-sm)]">
          <li>
            <a href="/hours">Hours</a>
          </li>
          <li>
            <a href="/admission">Admission</a>
          </li>
          <li>
            <a href="/directions">Directions</a>
          </li>
        </ul>
      </div>
      {/* Column 2 */}
      <div className="space-y-[var(--space-md)]">
        <h4 className="text-lg font-serif">Experience</h4>
        <ul className="space-y-[var(--space-sm)]">
          <li>
            <a href="/events">Events</a>
          </li>
          <li>
            <a href="/tours">Tours</a>
          </li>
          <li>
            <a href="/groups">Groups</a>
          </li>
        </ul>
      </div>
      {/* Columns 3 & 4 ... */}
    </div>
    <div className="mt-[var(--space-4xl)] pt-[var(--space-xl)] border-t border-white/20">
      <p className="text-center text-sm text-white/60">© 2026 Rocky Mount State Historic Site</p>
    </div>
  </div>
</footer>
```

---

## Modal/Overlay Patterns

**Modal Dialog**

```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-[var(--space-lg)]">
  <div className="bg-white rounded-sm p-[var(--spacing-card-lg)] max-w-2xl w-full">
    <div className="flex items-center justify-between mb-[var(--space-xl)]">
      <h2 className="text-2xl font-serif">Modal Title</h2>
      <button className="p-[var(--space-xs)]">
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="space-y-[var(--space-lg)]">
      <p>Modal content goes here.</p>
      <div className="flex gap-[var(--gap-md)] justify-end">
        <button className="px-[var(--space-xl)] py-[var(--space-md)]">Cancel</button>
        <button className="px-[var(--space-xl)] py-[var(--space-md)] bg-accent">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

**Dropdown Menu**

```tsx
<div className="absolute top-full right-0 mt-[var(--space-xs)] bg-white rounded-sm shadow-[var(--shadow-lg)] py-[var(--space-sm)] min-w-[200px]">
  <a href="/profile" className="block px-[var(--space-lg)] py-[var(--space-sm)] hover:bg-gray-50">
    Profile
  </a>
  <a href="/settings" className="block px-[var(--space-lg)] py-[var(--space-sm)] hover:bg-gray-50">
    Settings
  </a>
  <div className="my-[var(--space-xs)] border-t border-gray-200" />
  <a href="/logout" className="block px-[var(--space-lg)] py-[var(--space-sm)] hover:bg-gray-50">
    Logout
  </a>
</div>
```

---

## Special Patterns

### Event Calendar Card

```tsx
<div className="p-[var(--spacing-card-md)] bg-white shadow-[var(--shadow-md)] rounded-sm">
  {/* Date Badge */}
  <div className="flex items-start gap-[var(--gap-md)] mb-[var(--space-lg)]">
    <div className="flex flex-col items-center bg-accent text-primary px-[var(--space-md)] py-[var(--space-sm)] rounded-sm">
      <span className="text-xs font-semibold">MAR</span>
      <span className="text-2xl font-bold">4</span>
    </div>
    <div className="flex-1">
      <span className="text-xs uppercase tracking-wider text-secondary">Signature Event</span>
      <h3 className="text-xl font-serif mt-[var(--space-xs)]">America 250 Opening Ceremony</h3>
    </div>
  </div>

  {/* Event Details */}
  <div className="space-y-[var(--space-sm)] mb-[var(--space-lg)]">
    <div className="flex items-center gap-[var(--gap-md)] text-sm text-gray-600">
      <Clock className="w-4 h-4" />
      <span>10:00 AM - 4:00 PM</span>
    </div>
    <div className="flex items-center gap-[var(--gap-md)] text-sm text-gray-600">
      <MapPin className="w-4 h-4" />
      <span>Rocky Mount State Historic Site</span>
    </div>
  </div>

  {/* Description */}
  <p className="text-gray-600 mb-[var(--space-xl)]">
    Join us as we kick off America's 250th birthday celebration at the site where Tennessee's
    government began.
  </p>

  {/* CTA */}
  <button className="w-full px-[var(--space-xl)] py-[var(--space-md)] bg-accent text-primary">
    Reserve Tickets
  </button>
</div>
```

### Feature Comparison Table

```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="bg-cream">
        <th className="px-[var(--space-lg)] py-[var(--space-md)] text-left">Feature</th>
        <th className="px-[var(--space-lg)] py-[var(--space-md)] text-center">Basic</th>
        <th className="px-[var(--space-lg)] py-[var(--space-md)] text-center">Premium</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t border-gray-200">
        <td className="px-[var(--space-lg)] py-[var(--space-md)]">Site Access</td>
        <td className="px-[var(--space-lg)] py-[var(--space-md)] text-center">✓</td>
        <td className="px-[var(--space-lg)] py-[var(--space-md)] text-center">✓</td>
      </tr>
      {/* More rows... */}
    </tbody>
  </table>
</div>
```

---

## Responsive Patterns

### Responsive Grid with Fluid Spacing

```tsx
<div
  className="
  grid
  grid-cols-1 gap-[var(--gap-md)]
  md:grid-cols-2 md:gap-[var(--gap-lg)]
  lg:grid-cols-3 lg:gap-[var(--gap-xl)]
"
>
  {items.map((item) => (
    <div
      key={item.id}
      className="
      p-[var(--spacing-card-sm)]
      md:p-[var(--spacing-card-md)]
      lg:p-[var(--spacing-card-lg)]
    "
    >
      {item.content}
    </div>
  ))}
</div>
```

### Responsive Section Padding

```tsx
<section
  className="
  py-[var(--space-4xl)] px-[var(--layout-page-padding-mobile)]
  md:py-[var(--layout-section-y-tablet)] md:px-[var(--layout-page-padding-tablet)]
  lg:py-[var(--layout-section-y-desktop)] lg:px-[var(--layout-page-padding-desktop)]
"
>
  {content}
</section>
```

---

## Conclusion

These patterns represent the most common spacing use cases in the Tennessee Starts Here project. All use the 8pt grid spacing tokens for consistency and maintainability.

**Key Takeaways:**

- Icon + text → `--gap-md`
- Card padding → `--spacing-card-md`
- Card grids → `--gap-lg`
- Section spacing → `--layout-section-y-{breakpoint}`
- Page padding → `--layout-page-padding-{breakpoint}`

For full documentation, see `SPACING-SYSTEM.md`.
