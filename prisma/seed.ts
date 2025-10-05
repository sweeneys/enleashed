import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.work.upsert({
    where: { slug: 'thesis-overview' },
    update: {},
    create: {
      slug: 'thesis-overview',
      title: 'PhD Thesis Overview',
      summary: 'A concise overview of my PhD research questions, methods, and contributions.',
      bodyMdx: `
# Title: Market Design, Flexibility, and Fairness in Electricity Systems

## Abstract
This is where your abstract MDX goes. Visitors can highlight any sentence and leave comments.

## Chapter 1: Introduction
Write your background and motivation here. Include references like [1] and figures.

## Methods
- Unit commitment and optimal power flow
- Shapley value allocations
- Behavioural heterogeneity models

## Results
Key figures and tables...

## Conclusion
Implications and future work.
`
    }
  })
  console.log('Seeded')
}

main().finally(() => prisma.$disconnect())
