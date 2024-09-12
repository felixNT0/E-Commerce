import { MaterialDesignContent } from "notistack";
import styled from "styled-components";

export const StyledNotistack = styled(MaterialDesignContent)`
  ${({ theme }) => {
    return `
      & #notistack-snackbar {
        padding: 0;
        flex-grow: 1;
      }
      &.notistack-MuiContent {
        color: #216869;
        font-size: bold;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 8px;
        background-color: white;
      }
      &.notistack-MuiContent-default {
        color: #216869;
        background-color: white;
      }
    `;
  }}
`;

type StyledIconProps = {
  color: "primary" | "success" | "secondary" | "error";
};

export const StyledIcon = styled.span<StyledIconProps>`
  ${({ theme }) => `
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 8px;
    color: #216869;
    background-color: white;
  `}
`;
