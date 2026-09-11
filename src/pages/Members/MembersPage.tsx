import type { MetaFunction } from 'react-router'
import { Container } from '@/components/common/Container'
import { MemberCard } from '@/components/member/MemberCard'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { MEMBERS } from '@/data/members'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Members'),
    description: 'Conoce a los siete integrantes de BTS y descubre la colección Purple Wave inspirada en cada uno.',
    path: ROUTES.members,
  })

// RM (line-up order [0]) gets the featured slot — but only from `lg:` up
// (see MemberCard). Below that it's just member #1 in the same 2-column
// grid as everyone else, so there's no duplicated markup per breakpoint.
export default function MembersPage() {
  return (
    <div className="relative overflow-hidden">
      <MembersAtmosphere />

      <Container className="relative py-16 sm:py-20">
        <div className="mb-12 flex flex-col items-center gap-3 text-center sm:mb-16">
          <span className="font-display text-xs italic tracking-[0.1em] text-purple-light/80">
            — Better together
          </span>
          <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl">MEET THE SEVEN</h1>
          <span aria-hidden="true" className="h-px w-12 bg-purple-light/40" />
          <p className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-lavender sm:text-base">
            Seven voices. Seven stories. <span className="text-purple-light">One purple ocean.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
          {MEMBERS.map((member, index) => (
            <MemberCard
              key={member.slug}
              member={member}
              index={index}
              featured={index === 0}
              className={index === 0 ? 'lg:col-span-3' : ''}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

// Purple-haze concert-editorial atmosphere behind the whole section — three
// soft glows, two blurred light streaks, and the same fractal-noise texture
// ProductImage.tsx already uses for its placeholder mockups (reused for
// consistency rather than inventing a second noise technique). Pure CSS/SVG,
// no image assets.
function MembersAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 15% 0%, rgba(128,84,255,0.32), transparent 70%), ' +
            'radial-gradient(ellipse 55% 50% at 90% 24%, rgba(255,49,92,0.13), transparent 70%), ' +
            'radial-gradient(ellipse 70% 55% at 50% 105%, rgba(128,84,255,0.26), transparent 70%), ' +
            'radial-gradient(ellipse 40% 35% at 50% 8%, rgba(180,156,255,0.22), transparent 70%)',
        }}
      />
      <div
        className="absolute -left-1/4 top-0 h-[140%] w-1/3 rotate-[10deg] opacity-[0.09] blur-3xl"
        style={{ background: 'linear-gradient(180deg, transparent, #B49CFF, transparent)' }}
      />
      <div
        className="absolute -right-1/4 top-1/3 h-[120%] w-1/4 -rotate-[12deg] opacity-[0.07] blur-3xl"
        style={{ background: 'linear-gradient(180deg, transparent, #8054FF, transparent)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
