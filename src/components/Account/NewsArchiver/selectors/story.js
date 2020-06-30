const isNotArchived = archiveIds => story =>
   archiveIds.indexOf(story.url) === -1;

const getReadableStories = ({ storyState, archiveState }) =>
   storyState.stories.filter(isNotArchived(archiveState));
// const getReadableStories = storyState => [storyState];

const getFetchError = ({ storyState }) => storyState.error;

export { getReadableStories, getFetchError };
