import styled from "styled-components";

export const Segment = styled.p`
  color: ${props => props.color};
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
`;
export const Button = styled.button`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  width: ${props => (props.width ? props.width : "100%")};
  border-radius: 5px;
  border: none;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  outline: none;
`;
