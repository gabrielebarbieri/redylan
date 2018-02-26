<template>
	<div class="gb-content">
		<h1>Remixing dylan lyrics with style</h1>
		<p>
			Redylan is an implementation of the research I did during my PhD thesis. 
			It uses artificial intelligence techniques to model the style of Bob Dylan as mathematical model. 
			Such a model can generate new lyrics in the style of Bob Dylan, controlled by high level parameters (lyrics' theme and <a href="https://en.wikipedia.org/wiki/Rhyme_scheme">rhyme scheme</a>) chosen by the user.
		</p>
		<h3>Constrained Markov process</h3>
		<p>
			Redylan uses good ol' <a href="https://en.wikipedia.org/wiki/Markov_chain">Markov chains</a> to model the style of Bob Dylan. 
			According to Wikipedia, a Markov chain is <i>"a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous events"</i>. <br>
			In less formal terms, this means that the probability of the occurence of an item in a sequence (such as a word in a sentence) depends on the itmes (words) preceding it. 
			For instance, if you think of Bob Dylan as a Markov process, a sentence starting as "the answer is blowin' in " has a <a href="https://www.youtube.com/watch?v=vWwgrjjIMXA">very likely continuation</a>.<br>
			<a href="http://setosa.io/blog/2014/07/26/markov-chains/">Here</a> you can find a very effectiv visual explanation of Markov Chains and how they can be used to generate new sequences.<br>
			Generating text with Markov chain is not a novel idea at all. 
			You can find many examples on the web of <a href="https://revdancatt.com/projects/CAT784-remixing-trump">Markov Donald Trump</a> and <a href="https://github.com/krrishd/talk-to-obama">Markov Barack Obama</a>. There are examples of Markov chatbots back in  <a href="http://glenda.cat-v.org/friends/mark-v-shaney/grain-of-salt">the early days of internet</a>. You can even find an example of a Markov process that generate text in your own style each time you use the smart keyboard of your smartphone. 
		</p>
		<p>
			The limitation with Markov chains is that you cannot really control them. Imagine you want to generate sentences that ends with a certain word. One way to do this is to let the Markov chain generate plainty of sentences and keep only the good ones. With common words like <i>love</i> or <i>young</i>, this may be a viable solution. The problems arise when you want a less common word like <a href="https://bobdylan.com/songs/union-sundown/"><i>Malaysia</i></a>. In this case the probability of a sentence satisfying this constraint (ending with the word Malaysia) is almost equal to 0, therefore you don't have any guarantee that the Markov chain is able to generate such a sentence. 
		</p>
		<p>
			Ideally, what we really want is a new model that:
			<ul>
				<li>generates exactly the senteces that satisfy the control constraints</li>
				<li>the admissible senteces are generated with the same probabilities as the original Markov chain.</li>
			</ul>
			A constrained Markov process allow precisely to do this. It uses <a href="https://en.wikipedia.org/wiki/Constraint_satisfaction_problem">constraint satisfaction techniques</a> to force a Markov chain to generate only admissible sentences without altering its probability distribution. For more details, you can read <a href="https://www.csl.sony.fr/downloads/papers/2012/barbieri-12a.pdf">this paper</a>.
		</p>
		<generator></generator>
		
		
		<p>Perec Video</p>
		<p>Relation with Flow Machines</p>
		<iframe width="560" height="315" src="https://www.youtube.com/embed/1rdE_0mHjjQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		<p>SKYGGE</p>
		
	</div>
</template>

<script>
	import Generator from '@/components/VerseGenerator'
	export default {
	  name: 'how-it-works',
	  data () {
	    return {}
	  },
	  components: {
    'generator': Generator
	  }
	}
</script>

<style>
	.gb-content {
		font-size: 16px;
    	line-height: 1.5;
    	font-weight: 300;
		text-align: justify;
	}
</style>