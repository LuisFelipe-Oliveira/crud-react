import "../../styles/components/header.scss";

export const Header = () => {
  return (
    <header>
      <div className="contentLogo text-center">
        <img src="assets/media/logo.png" alt="" />
        <h1 className="title">
          ProMaster
        </h1>
      </div>
    </header>
  )
}