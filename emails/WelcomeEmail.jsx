import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE || "http://localhost:3000";

export default function WelcomeEmail({ username = "Developer" }) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to CodeBlog – Dive into the world of code and ideas!
      </Preview>
      <Tailwind>
        <Body className="bg-[#f8f9fa] font-sans">
          <Container className="mx-auto w-full max-w-[600px] p-6 text-center bg-white shadow-md rounded-lg">
            {/* Logo */}
            <Section>
              <Link href={`${WEBSITE_URL}`}>
                <Img
                  src="https://res.cloudinary.com/dltoavydo/image/upload/v1741564253/favicon_h2rmbt.png"
                  width="60"
                  height="60"
                  alt="CodeBlog Logo"
                  className="mx-auto"
                />
              </Link>
            </Section>

            {/* Welcome Message */}
            <Section className="mt-4">
              <Text className="text-3xl font-extrabold text-[#1a202c]">
                Welcome, {username}! 👨‍💻👩‍💻
              </Text>
              <Text className="text-lg text-gray-700 mt-2 leading-relaxed">
                We're thrilled to welcome you to <strong>CodeBlog</strong> — the
                space where developers like you share, learn, and grow together.
              </Text>
              <Text className="text-lg text-gray-700 mt-2 leading-relaxed">
                Whether you're writing deep dives, reading tutorials, or
                exploring dev insights, you've joined a community built for
                coders, by coders.
              </Text>
            </Section>

            {/* Call-to-Action Button */}
            <Section className="mt-6">
              <Button
                href={`${WEBSITE_URL}/explore`}
                className="bg-[#3b82f6] text-white text-lg font-bold px-6 py-3 rounded-lg inline-block shadow-md"
              >
                Explore Blogs Now
              </Button>
            </Section>

            {/* Closing Message */}
            <Section className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mt-4">
                Keep coding, keep learning. <br />– The CodeBlog Team 💡
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="my-6 border-gray-300" />
            <Text className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CodeBlog. All rights reserved.
              <br />
              Visit us at{" "}
              <a
                href={WEBSITE_URL}
                className="text-[#3b82f6] font-semibold hover:underline"
              >
                {WEBSITE_URL}
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
