import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'
import { Container } from '@/components/common/Container'
import { ROUTES } from '@/constants/routes'
import { pageTitle } from '@/constants/site'
import { buildMeta } from '@/lib/meta'
import { MEMBERS } from '@/data/members'
import type { Member } from '@/types/member'

export const meta: MetaFunction = () =>
  buildMeta({
    title: pageTitle('Members'),
    description: 'Conoce a los siete integrantes de BTS y descubre la colección Purple Wave inspirada en cada uno.',
    path: ROUTES.members,
  })

// RM (line-up order [0], MEMBERS.ts) gets the featured editorial slot as the
// group's leader — everyone else fills a smaller, slightly varied grid so
// the page doesn't read as seven identical cards.
export default function MembersPage() {
  const [leader, ...rest] = MEMBERS

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 max-w-lg">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">MEET THE SEVEN</h1>
        <p className="mt-3 text-sm text-foreground-muted sm:text-base">
          Siete voces, un mismo Purple Ocean. Elige un integrante y descubre su colección.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leader ? (
          <MemberTile
            member={leader}
            aspect="aspect-[16/10] sm:aspect-[21/9]"
            className="sm:col-span-2 lg:col-span-3"
            featured
          />
        ) : null}
        {rest.map((member, index) => (
          <MemberTile key={member.slug} member={member} aspect={index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-square'} />
        ))}
      </div>
    </Container>
  )
}

function MemberTile({
  member,
  aspect = 'aspect-square',
  className = '',
  featured = false,
}: {
  member: Member
  aspect?: string
  className?: string
  featured?: boolean
}) {
  return (
    <Link
      to={ROUTES.memberDetail(member.slug)}
      className={`group relative block overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-1 ${aspect} ${className}`}
      style={{ background: member.gradient }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center font-display font-bold text-foreground/90 transition-transform duration-300 group-hover:scale-105 ${
          featured ? 'text-7xl sm:text-9xl' : 'text-5xl'
        }`}
      >
        {member.initial}
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 sm:p-5">
        <span className={`block font-display font-bold ${featured ? 'text-2xl sm:text-4xl' : 'text-lg'}`}>
          {member.stage}
        </span>
        <span className="text-xs text-foreground-muted sm:text-sm">{member.role}</span>
      </div>
    </Link>
  )
}
