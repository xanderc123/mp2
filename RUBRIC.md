# MP2 Rubric Checklist

This checklist maps every grading criterion to the implementation and a quick manual verification path.

| Criterion | Points | Implementation | Quick verification |
| --- | ---: | --- | --- |
| List displays relevant API items | 4 | `ListPage` renders 100 paintings supplied by the Art Institute of Chicago API. | Open **List** and confirm artwork title, artist, date, and origin rows appear. |
| Search filters items | 8 | `matchesKeyword` searches title, artist, date, origin, medium, department, and classification. | Search for `Nighthawks`; the result count changes to one work. |
| Sort by at least two properties | 8 | List can sort by title, artist, or date. | Try all three options in **Sort by**. |
| Ascending and descending sorting | 8 | Every sort property supports both directions without mutating source data. | Change **Direction** and compare the first result. |
| Gallery contains item media | 4 | `GalleryPage` displays image-based works in a responsive visual grid. | Open **Gallery** and confirm artwork media cards appear. |
| Gallery filter changes results | 8 | Department selector recomputes the visible cards and result count. | Select **Painting and Sculpture of Europe** and confirm the count changes. |
| List item opens Details | 10 | Every list row is a React Router `Link` to `/artwork/:id`. | Click any row and confirm a dedicated details URL opens. |
| Gallery item opens Details | 10 | Every gallery card links to the same dedicated detail route. | Click any gallery card and confirm the artwork details appear. |
| Details view contains item details | 8 | Detail page includes title, artist, date, origin, medium, dimensions, department, classification, gallery, and credit line when supplied by the API. | Open **Nighthawks** and inspect its metadata. |
| Previous and Next work | 10 | Detail navigation computes adjacent collection entries and links to their IDs. | From **A Sunday on La Grande Jatte — 1884**, choose **Next** and confirm **Nighthawks** opens. |
| React Router and TypeScript | 12 | Strict TypeScript, typed API data, `BrowserRouter`, nested routes, links, and `/mp2/` basename are configured. | Run `pnpm run build`; inspect the URL after navigation. |
| Design | 10 | Responsive editorial layout, gallery-first imagery, coherent typography and color, mobile breakpoint, keyboard focus, alt text, skip link, loading/error/empty states, and reduced-motion support. | Review home, list, gallery, and detail pages at desktop and mobile widths. |

**Total covered: 100/100 points.**

## Automated checks

```bash
pnpm run lint
pnpm run test
pnpm run build
```

## Browser acceptance checks completed

- API returned 100 relevant painting records.
- Searching `Nighthawks` reduced the list to one result.
- Artist descending sorting changed the result order.
- Department filtering changed the gallery from 100 to 64 visible works in the tested dataset.
- List and gallery links produced `/artwork/:id` routes.
- Next navigation changed `/artwork/27992` to `/artwork/111628` and updated the displayed artwork.
- A 375 px viewport had no horizontal overflow.
