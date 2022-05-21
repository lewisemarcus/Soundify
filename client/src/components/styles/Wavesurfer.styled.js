import styled from "styled-components"

export const WaveformContianer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100%;
    background: transparent;
    gap: 2rem;
`

export const Wave = styled.div`
    width: 100%;
    height: 90px;
`

export const PlayButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    font-size: 50px;
    background: #ec994b;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    transition: all 0.2s;
    &:hover {
        background: #eab481;
    }
`
