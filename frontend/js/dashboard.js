// If not logged in, send back to login page
const token = localStorage.getItem('crm_token');
if (!token) window.location.href = '/index.html';

// Helper: build auth header for every API request
function headers() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
}

// Helper: escape HTML to prevent XSS vulnerability attacks
function safe(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ─── Load all leads ──────────────────────────────
async function loadLeads() {
    try {
        const res = await fetch('/api/leads', { headers: headers() });
        if (res.status === 401) {
            logout();
            return;
        }
        const leads = await res.json();
        renderTable(leads);
        renderStats(leads);
    } catch (err) {
        console.error('Error loading leads:', err);
    }
}

// ─── Render table rows ──────────────────────────
function renderTable(leads) {
    const tbody = document.getElementById('leads-tbody');
    if (leads.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-msg">No leads yet — add your first one above!</td></tr>';
        return;
    }

    tbody.innerHTML = leads.map(lead => `
        <tr>
            <td><strong>${safe(lead.name)}</strong></td>
            <td>${safe(lead.email)}</td>
            <td>${safe(lead.source)}</td>
            <td>
                <select class="status-select status-${lead.status}" onchange="updateStatus('${lead._id}', this.value)">
                    <option value="new" ${lead.status === 'new' ? 'selected' : ''}>🔵 New</option>
                    <option value="contacted" ${lead.status === 'contacted' ? 'selected' : ''}>🟡 Contacted</option>
                    <option value="converted" ${lead.status === 'converted' ? 'selected' : ''}>🟢 Converted</option>
                </select>
            </td>
            <td>
                <input class="notes-input" type="text" value="${safe(lead.notes)}" placeholder="Add notes..." onblur="saveNotes('${lead._id}', this.value)">
            </td>
            <td>
                <button class="btn-delete" onclick="deleteLead('${lead._id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// ─── Update stats cards ─────────────────────────
function renderStats(leads) {
    document.getElementById('total-count').textContent = leads.length;
    document.getElementById('new-count').textContent = leads.filter(l => l.status === 'new').length;
    document.getElementById('contacted-count').textContent = leads.filter(l => l.status === 'contacted').length;
    document.getElementById('converted-count').textContent = leads.filter(l => l.status === 'converted').length;
}

// ─── Add a new lead ─────────────────────────────
document.getElementById('add-lead-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('add-btn');
    btn.textContent = 'Adding...';
    btn.disabled = true;

    const lead = {
        name: document.getElementById('lead-name').value.trim(),
        email: document.getElementById('lead-email').value.trim(),
        source: document.getElementById('lead-source').value
    };

    try {
        const res = await fetch('/api/leads', {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(lead)
        });
        if (res.ok) {
            this.reset();
            loadLeads();
        }
    } catch (err) {
        console.error('Error adding lead:', err);
    } finally {
        btn.textContent = '+ Add Lead';
        btn.disabled = false;
    }
});

// ─── Update status ──────────────────────────────
async function updateStatus(id, status) {
    await fetch('/api/leads/' + id, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ status })
    });
    loadLeads();
}

// ─── Save notes (when user clicks away from input) ──
async function saveNotes(id, notes) {
    await fetch('/api/leads/' + id, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ notes })
    });
}

// ─── Delete a lead ──────────────────────────────
async function deleteLead(id) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    await fetch('/api/leads/' + id, {
        method: 'DELETE',
        headers: headers()
    });
    loadLeads();
}

// ─── Logout ─────────────────────────────────────
function logout() {
    localStorage.removeItem('crm_token');
    window.location.href = '/index.html';
}

document.getElementById('logout-btn').addEventListener('click', logout);

// Load data immediately on startup
loadLeads();