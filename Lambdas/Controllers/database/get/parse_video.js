
module.exports = ({ snippet }) => {
    const { publishedAt, title, description, thumbnails, resourceId } = snippet;

    return [
        publishedAt,
        title,
        description,
        thumbnails.standard ? thumbnails.standard.url : thumbnails.medium.url,
        resourceId.videoId,
        false
    ];
};
