import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          // the following props is for setting the dimensions manually
          // width={100}
          // height={100}
          // this prop is for setting multiple sizes using css unites at the same time
          sizes="10vw"
          // priority prop is to tell the app that this image will always be priority
          // and will always be visible on the screen
          priority
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
