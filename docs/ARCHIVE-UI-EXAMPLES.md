# Archive UI Component Examples

Visual guide to the archive integration components in the almanac.

## PrimarySourceLink Component

**Purpose:** Subtle, inline reference to primary sources

**Visual Structure:**

```
┌────────────────────────────────────────────────┐
│  ━━━━━━━━━━━━━━━━━━━━━━━━━ (border-top)      │
│                                                │
│  📄 "Blount to Knox on territorial             │
│     agriculture, 1791"                         │
│                                                │
│     VIEW SOURCE →                              │
└────────────────────────────────────────────────┘
```

**Styling:**

- Border: `border-t border-white/5`
- Icon: `text-gold-leaf/60` (FileText or User)
- Quote: `text-almanac-parchment/50 italic`
- Link: `text-gold-leaf hover:text-almanac-gold`
- Arrow: Subtle right arrow that shifts on hover

**Code:**

```tsx
<PrimarySourceLink
  quote="Blount to Knox on territorial agriculture, 1791"
  href="/evidence/documents/blount-knox-agriculture"
  type="document"
/>
```

**Size:** Small, ~80px height, full width
**Mobile:** Stacks naturally, icon stays inline

---

## ArchiveLinkCard Component

**Purpose:** Featured card for highlighted archive documents

**Visual Structure:**

```
┌────────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (gold gradient)      │
├────────────────────────────────────────────────┤
│                                                │
│  📄  Governor Blount's Agricultural Report     │
│                                                │
│      📅 May 12, 1791  •  🏷️ Agriculture       │
│                                                │
│  Observations on crop yields and soil          │
│  conditions in the Southwest Territory, 1791   │
│                                                │
│  READ DOCUMENT →                               │
│                                                │
├────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ (subtle gradient)  │
└────────────────────────────────────────────────┘
```

**Styling:**

- Top bar: `bg-gradient-to-r from-gold-leaf/40 via-gold-leaf/60 to-gold-leaf/40`
- Background: `bg-gradient-to-br from-amber-50/10 to-cream/5`
- Border: `border border-gold-leaf/20`
- Title: `font-serif text-lg text-gold-leaf`
- Metadata: `text-xs text-almanac-parchment/50`
- Description: `text-sm text-almanac-parchment/70`
- CTA: `text-xs uppercase tracking-wider text-gold-leaf`

**Code:**

```tsx
<ArchiveLinkCard
  title="Governor Blount's Agricultural Report"
  description="Observations on crop yields and soil conditions in the Southwest Territory, 1791"
  href="/evidence/documents/blount-agricultural-report"
  type="document"
  date="May 12, 1791"
  category="Agriculture"
/>
```

**Size:** Medium, ~180-200px height, full width
**Hover:** Border brightens to `gold-leaf/40`, shadow appears
**Mobile:** Fully responsive, maintains padding

---

## Integration Example: Farmer's Memory

**Visual Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ FARMER'S MEMORY                                             │
│ Historical patterns & folk wisdom validated by data         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Historical Averages                                         │
│ Normal Range: 68° / 45°                                     │
│ Today vs Normal: Warmer than usual                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Pattern Detected                                            │
│ [Pattern data...]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📜 FROM THE ARCHIVE                                         │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ ├───────────────────────────────────────────────────────┤ │
│ │                                                       │ │
│ │ 📄  Spring Planting Season                            │ │
│ │                                                       │ │
│ │     📅 April 14, 1792  •  🏷️ Agriculture             │ │
│ │                                                       │ │
│ │ Frontier farmers planted corn, wheat, tobacco.        │ │
│ │ This gazette describes spring cultivation.            │ │
│ │                                                       │ │
│ │ READ DOCUMENT →                                       │ │
│ │                                                       │ │
│ └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**

```tsx
{
  /* From the Archive - Featured document */
}
{
  featuredDoc && (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-4 h-4 text-gold-leaf" />
        <h3 className="text-sm font-medium text-gold-leaf">From the Archive</h3>
      </div>
      <ArchiveLinkCard
        title={featuredDoc.title}
        description={featuredDoc.context}
        href={`/evidence/documents/${featuredDoc.slug}`}
        type="document"
        date={featuredDoc.date}
        category={featuredDoc.theme}
      />
    </div>
  )
}
```

---

## Color Palette

**Gold tones (from Tailwind config):**

- `--color-gold-leaf`: #c5a059 (primary gold)
- `--color-almanac-gold`: #c5a059 (hover state)
- Gold 60%: rgba(197, 160, 89, 0.6)
- Gold 40%: rgba(197, 160, 89, 0.4)
- Gold 20%: rgba(197, 160, 89, 0.2)

**Parchment tones:**

- `--color-almanac-parchment`: #f4ecd8
- Parchment 70%: rgba(244, 236, 216, 0.7)
- Parchment 50%: rgba(244, 236, 216, 0.5)

**Backgrounds:**

- Midnight: `--color-almanac-midnight` (#0a1128)
- White overlays: `bg-white/5`, `bg-white/10`
- Amber overlays: `from-amber-50/10`

**Borders:**

- Subtle: `border-white/5`, `border-white/10`
- Medium: `border-gold-leaf/20`
- Bright: `border-gold-leaf/40` (hover)

---

## Typography

**Font families:**

- Serif: Playfair Display (headings, titles)
- Sans: System UI (body text, metadata)

**Document titles:**

- Font: `font-serif`
- Size: `text-lg` (18px)
- Color: `text-gold-leaf`

**Quotes:**

- Font: `font-serif`
- Style: `italic`
- Size: `text-xs` (12px)
- Color: `text-almanac-parchment/50`

**Metadata:**

- Font: `font-sans`
- Size: `text-xs` (12px)
- Color: `text-almanac-parchment/50`

**CTAs:**

- Font: `font-sans`
- Transform: `uppercase`
- Tracking: `tracking-wider`
- Size: `text-[10px]`
- Weight: `font-medium`

---

## Icons

**Used icons (from lucide-react):**

- `FileText` - Document references
- `User` - Person references
- `Calendar` - Dates
- `Tag` - Categories
- `History` - Archive sections

**Icon styling:**

- Size: `w-4 h-4` (16px) for cards, `w-3.5 h-3.5` (14px) for inline
- Color: `text-gold-leaf/60` or `text-gold-leaf/70`
- Spacing: `gap-2` or `gap-1.5` from text

---

## Animation

**Hover effects:**

```css
/* Border brightening */
border: border-gold-leaf/20
hover: border-gold-leaf/40

/* Shadow appearance */
hover: shadow-lg shadow-gold-leaf/10

/* Arrow translation */
group-hover:translate-x-0.5  /* inline links */
group-hover:translate-x-1    /* card links */

/* Color transitions */
transition-colors duration-300
```

**Entry animations (Framer Motion):**

```tsx
// ArchiveLinkCard
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
```

---

## Responsive Behavior

**Mobile (< 768px):**

- Components maintain full width
- Padding reduces slightly for inline links
- Cards maintain all content, just narrower
- Icons stay visible
- Touch targets: minimum 44x44px

**Tablet (768px - 1024px):**

- Components scale naturally
- Optimal reading width maintained

**Desktop (> 1024px):**

- Maximum width constraints prevent over-stretching
- Card hover effects fully functional
- Arrow animations visible

---

## Accessibility

**Semantic HTML:**

- Links use `<a>` tags (via Next.js Link)
- Icons have `aria-hidden="true"`
- Card links wrap entire component

**Keyboard navigation:**

- All links are keyboard accessible
- Focus states visible
- Tab order logical

**Screen readers:**

- Icon decorations hidden from screen readers
- Link text is descriptive
- Quotes use proper quotation marks

**Color contrast:**

- Gold on midnight: 4.5:1 ratio (WCAG AA)
- Parchment on midnight: 9:1 ratio (WCAG AAA)
- All text meets WCAG 2.1 Level AA standards

---

## Performance

**Bundle size:**

- PrimarySourceLink: ~2KB
- ArchiveLinkCard: ~3KB (includes Framer Motion)
- Total impact: Minimal

**Render performance:**

- Components are small and efficient
- Framer Motion animations GPU-accelerated
- No unnecessary re-renders

**Loading:**

- Components render immediately (no lazy loading needed)
- Icons from lucide-react tree-shakeable
- Archive mapping data loaded with almanac

---

## Testing Checklist

**Visual testing:**

- [ ] PrimarySourceLink displays correctly
- [ ] ArchiveLinkCard displays correctly
- [ ] Colors match almanac palette
- [ ] Typography is consistent
- [ ] Icons render properly
- [ ] Hover effects work
- [ ] Mobile responsive

**Functional testing:**

- [ ] Links navigate correctly
- [ ] Document slugs resolve
- [ ] Triggers activate properly
- [ ] No console errors
- [ ] Build succeeds
- [ ] Lint passes

**Accessibility testing:**

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA
- [ ] Focus states visible
- [ ] Touch targets minimum 44px

**Integration testing:**

- [ ] Farmer's Memory shows cards
- [ ] Weather triggers work
- [ ] Season triggers work
- [ ] Temperature triggers work
- [ ] Task score triggers work
