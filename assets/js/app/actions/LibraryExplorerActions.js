

export const LIBRARY_EXPLORER_CHANGED_VIEW = 'LIBRARY_EXPLORER_CHANGED_VIEW'
export const changeView = (view) => {
    return {
        type: LIBRARY_EXPLORER_CHANGED_VIEW,
        view: view,
    };
}