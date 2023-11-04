// JavaScript code to fetch the last 10 commit messages from GitHub API
const repoOwner = 'HiNett';
const repoName = 'hinett.github.io';
const loadingElement = document.querySelector('.loading');
const commitMessagesContainer = document.getElementById('commit-messages');

loadingElement.style.display = 'block'; // Show loading indicator

// Function to encode HTML entities
function encodeHtmlEntities(text) {
  const divElement = document.createElement('div');
  divElement.innerText = text;
  return divElement.innerHTML;
}

fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=10`)
  .then(response => response.json())
  .then(data => {
    data.forEach(commit => {
      // Split the commit message into title and additional text
      const commitMessageParts = commit.commit.message.split('\n\n');
      const commitTitle = commitMessageParts[0]; // Title is the first part
      const additionalText = commitMessageParts[1] || ''; // Additional text is the second part, default to empty string if undefined

      // Create commit title element
      const commitTitleElement = document.createElement('div');
      commitTitleElement.className = 'commit-title';
      commitTitleElement.innerText = commitTitle;

      // Create commit details element
      const commitDetails = document.createElement('div');
      commitDetails.className = 'commit-details';
      commitDetails.innerHTML = `
        <strong>Author:</strong> ${commit.commit.author.name}<br>
        <strong>Date:</strong> ${new Date(commit.commit.author.date).toLocaleString()}<br>
        <strong>Additional Text:</strong> ${encodeHtmlEntities(additionalText).replace(/\n/g, '<br>')}
      `;

      // Append commit title and details to the container
      commitMessagesContainer.appendChild(commitTitleElement);
      commitMessagesContainer.appendChild(commitDetails);

      // Toggle visibility of commit details when title is clicked
      commitTitleElement.addEventListener('click', () => {
        commitDetails.style.display = commitDetails.style.display === 'none' || commitDetails.style.display === '' ? 'block' : 'none';
      });
    });
  })
  .catch(error => console.error('Error fetching commits:', error))
  .finally(() => {
    loadingElement.style.display = 'none'; // Hide loading indicator when data is loaded
  });
