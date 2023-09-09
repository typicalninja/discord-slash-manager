<script lang="ts">
    	import {browser} from "$app/environment";
	    import { base } from '$app/paths';
        import { page } from '$app/stores';
</script>

<div class="m-2">
   <div class="bg-primary-700 p-2 flex flex-col gap-2 rounded-lg">
        <h1 class="text-xl font-bold">Add</h1>
        <label for="commandName">Command Name</label>
        <input type="text" name="commandName" id="commandName" placeholder="Command name" class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none" />
        <label for="interactionType">Interaction type</label>
        <select name="interactionType" id="interactionType" class="bg-primary-500 rounded-md p-2 focus:ring-0 focus:ring-offset-0 focus:outline-none">
            <option value="1">Chat input</option>
            <option value="2">User</option>
            <option value="3">Message</option>
        </select>
    </div>
</div>