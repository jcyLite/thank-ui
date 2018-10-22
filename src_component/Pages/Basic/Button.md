
	<tk-button>type为0</tk-button>
	<tk-button :type="1">type为1</tk-button>
	<tk-button-group :contents="['button_1','button_2']"></tk-button-group>
	<tk-button :type="2" @click="">type为2,固定在页脚</tk-button>