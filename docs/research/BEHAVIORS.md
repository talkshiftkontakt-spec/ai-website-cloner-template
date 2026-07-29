# Behaviors

## Sticky header
- Top bar + nav stick to top on all breakpoints
- White nav background, subtle shadow optional on scroll

## Button hover
- Primary filled → transparent + dark text (0.3s)
- Outline → filled green + white text (0.3s)
- Widget lift: translateY(-5px) on hover

## Feature / pricing cards
- Hover: translateY(-5px), keep box-shadow
- Transition ~0.3s

## Price counters
- data-to-value: 70, 80, 100
- duration 1000ms from 0 when section enters viewport
- Suffix " zł"

## Testimonials carousel
- Essential Addons / Swiper
- ~2 slides desktop, 1 mobile
- Pagination bullets active #83AC86
- Autoplay implied

## Smooth scroll
- html { scroll-behavior: smooth }
- Anchor offset for sticky header (~90px)

## Scroll to top
- Appears after scroll; green square with chevron-up
