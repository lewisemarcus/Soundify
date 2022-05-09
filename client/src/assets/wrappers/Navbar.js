import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    padding: 0.9rem 1rem;
  }

  .dropdown {
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background: var(--grey-50);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
    padding: 1rem;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-style: none;
    outline: 1px solid var(--red-dark);
    color: var(--red-dark);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    padding: 0.4rem 1rem;
    border-radius: 10px;
  }
  .dropdown-btn:hover {
    background: var(--red-dark);
    color: var(--white);
    transition: 0.4s;
  }
  .dropdown-btn:active {
    transform: scale(1.09);
    transition: transform 100ms;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
