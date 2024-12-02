import Container from "@/components/Container";
import FlexBox from "@/components/Box/FlexBox";
import ContactInfo from "@/views/Signin/ContactInfo";
import Header from "@/views/Signin/Header";
import SigninForm from "@/views/Signin/SigninForm";

export default function Test() {
  return (
    <Container className="bg-neutral-200">
      <FlexBox className="flex-col p-10">
        <Header />
        <FlexBox className="flex-row gap-8 p-4 bg-white">
          <SigninForm />
          <ContactInfo />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
