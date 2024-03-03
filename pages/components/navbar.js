import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
        <h3 class="navList">4School</h3>
      <ul class="navList">
        <li class="navList">
          <Link href="/">
            Home
          </Link>
        </li>
        <li class="navList">
          <Link href="/chat">
            Chat
          </Link>
        </li>
        <li class="navList">
          <Link href="/shop">
            Shop
          </Link>
        </li>
      </ul>
    </nav>
  );
};

