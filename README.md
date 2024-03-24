# Is Wiki Philosophy?
Determines if a Wikipedia article eventually gets you to the Philosophy page by clicking the first link over and over.

## Usage
```js
import isWikiPhilosophy from "is-wiki-philosophy";
console.log(isWikiPhilosophy("https://en.wikipedia.org/wiki/Trade_winds", { log: false, banNamespaces: true }));
```

### Options
- `log`: Setting to `true` will output all pages the function has visited.
- `banNamespaces`: Setting to `true` will ignore special pages as first links.

### Output
```
{
  state: true,
  stack: [
    'https://en.wikipedia.org/wiki/Trade_winds',
    'https://en.wikipedia.org/wiki/Northern_Hemisphere',
    'https://en.wikipedia.org/wiki/Earth',
    'https://en.wikipedia.org/wiki/Planet',
    'https://en.wikipedia.org/wiki/Hydrostatic_equilibrium',
    'https://en.wikipedia.org/wiki/Fluid_mechanics',
    'https://en.wikipedia.org/wiki/Physics',
    'https://en.wikipedia.org/wiki/Natural_science',
    'https://en.wikipedia.org/wiki/Branches_of_science',
    'https://en.wikipedia.org/wiki/Sciences',
    'https://en.wikipedia.org/wiki/Scientific_method',
    'https://en.wikipedia.org/wiki/Empirical_evidence',
    'https://en.wikipedia.org/wiki/Proposition',
    'https://en.wikipedia.org/wiki/Philosophy_of_language',
    'https://en.wikipedia.org/wiki/Analytic_philosophy'
  ]
}
```

## Test
First clone this repo, and run `npm install`.  
After that, run `npm test`.