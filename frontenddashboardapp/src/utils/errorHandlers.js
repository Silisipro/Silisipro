
export const handleRejection = (state, action) => {
    state.loading = false;
    const invalid = action.payload?.error?.code;
    const stat = action.payload?.error?.status;

    if (invalid === 401 && stat === "UNAUTHENTICATED") {
        localStorage.clear();
        window.location.reload();
    }

    state.status = 'failed';
};
